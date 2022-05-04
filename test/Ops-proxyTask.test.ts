import { expect } from "chai";
import { Signer } from "@ethersproject/abstract-signer";
import { abi as EIP173PROXY_ABI } from "hardhat-deploy/extendedArtifacts/EIP173Proxy.json";
import {
  Counter,
  Ops,
  OpsProxy,
  OpsProxyFactory,
  TaskTreasuryUpgradable,
} from "../typechain";

import hre = require("hardhat");
const { ethers, deployments } = hre;
import * as dotenv from "dotenv";
const config = dotenv.config();
const ALCHEMY_ID = config?.parsed?.ALCHEMY_ID;

const GELATO = "0x3CACa7b48D0573D793d3b0279b5F0029180E83b6";
const OPS_173PROXY = "0xB3f5503f93d5Ef84b06993a1975B9D21B962892F";
const UPGRADABLE_TREASURY = "0x2807B4aE232b624023f87d0e237A3B1bf200Fd99";
const ETH = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
const ZERO_ADDRESS = ethers.constants.AddressZero;

describe("Ops proxy task test", function () {
  this.timeout(0);

  let deployer: Signer;
  let executor: Signer;
  let opsOwner: Signer;
  let user: Signer;
  let user2: Signer;

  let opsOwnerAddress: string;
  let userAddress: string;
  let user2Address: string;

  let ops: Ops;
  let opsProxy: OpsProxy;
  let opsProxyImplementation: OpsProxy;
  let opsProxyFactory: OpsProxyFactory;
  let treasury: TaskTreasuryUpgradable;
  let counter: Counter;

  const txFee = ethers.utils.parseEther("0.5");

  before(async function () {
    // testing on mainnet block 14607294 (18th Apr)
    await setupFork();
    await deployments.fixture();
    [deployer, user, user2] = await ethers.getSigners();
    userAddress = await user.getAddress();
    user2Address = await user2.getAddress();

    treasury = await ethers.getContractAt(
      "TaskTreasuryUpgradable",
      UPGRADABLE_TREASURY
    );
    counter = await ethers.getContract("Counter");
    opsProxyFactory = await ethers.getContract("OpsProxyFactory");
    opsProxyImplementation = await ethers.getContract("OpsProxy");

    const opsFactory = await ethers.getContractFactory("Ops");

    const opsImplementation = await opsFactory.deploy(
      GELATO,
      treasury.address,
      opsProxyFactory.address
    );
    const ops173Proxy = await ethers.getContractAt(
      EIP173PROXY_ABI,
      OPS_173PROXY
    );

    // get accounts
    opsOwnerAddress = await ops173Proxy.owner();
    const depositAmount = ethers.utils.parseEther("10");

    await deployer.sendTransaction({
      value: depositAmount,
      to: opsOwnerAddress,
    });

    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [opsOwnerAddress],
    });
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [GELATO],
    });

    executor = await ethers.getSigner(GELATO);
    opsOwner = await ethers.getSigner(opsOwnerAddress);

    // upgrade opsProxy
    await ops173Proxy.connect(opsOwner).upgradeTo(opsImplementation.address);
    ops = await ethers.getContractAt("Ops", OPS_173PROXY);

    await treasury
      .connect(user)
      .depositFunds(userAddress, ETH, depositAmount, { value: depositAmount });
  });

  it("deploy ops proxy", async () => {
    const determinedProxyAddress = await opsProxyFactory.determineProxyAddress(
      userAddress
    );
    await opsProxyFactory.connect(user).deploy();

    const [proxyAddress, isDeployed] = await opsProxyFactory.getProxyOf(
      userAddress
    );
    opsProxy = await ethers.getContractAt("OpsProxy", proxyAddress);

    expect(proxyAddress).to.be.eql(determinedProxyAddress);
    expect(isDeployed).to.be.true;

    expect(await opsProxy.ops()).to.be.eql(ops.address);
    expect(await opsProxy.owner()).to.be.eql(userAddress);
    expect(await opsProxyFactory.isProxy(proxyAddress)).to.be.true;

    // whitelist proxy on counter
    await counter.connect(deployer).setWhitelist(opsProxy.address, true);
    expect(await counter.whitelisted(opsProxy.address)).to.be.true;
  });

  it("opsProxy and opsProxyFactory properly initialized", async () => {
    expect(await opsProxyFactory.implementation()).to.be.eql(
      opsProxyImplementation.address
    );

    expect(await opsProxy.ops()).to.be.eql(ops.address);
    expect(await opsProxy.owner()).to.be.eql(userAddress);
  });

  it("deploy proxy by creating task", async () => {
    const determinedProxyAddress = await opsProxyFactory.determineProxyAddress(
      user2Address
    );

    const task = await createTaskForProxy(user2, determinedProxyAddress);
    const [proxyAddress, isDeployed] = await opsProxyFactory.getProxyOf(
      user2Address
    );

    expect(proxyAddress).to.be.eql(determinedProxyAddress);
    expect(isDeployed).to.be.true;
    expect(await ops.taskCreator(task.taskId)).to.be.eql(user2Address);
  });

  it("owner can create task for proxy", async () => {
    // task creator will be user, exec address is proxy address
    const task = await createTaskForProxy(user, opsProxy.address);
    expect(await ops.taskCreator(task.taskId)).to.be.eql(userAddress);

    await executeAndCompareCount(task);
    await ops.connect(user).cancelTask(task.taskId);
  });

  it("non owner cannot create task for proxy", async () => {
    await expect(
      createTaskForProxy(user2, opsProxy.address)
    ).to.be.revertedWith("Ops: _createTask: Not authorised");
  });

  it("owner can create task with proxy", async () => {
    // task creator will be user, exec address is proxy address
    const task = await createTaskWithProxy(user, opsProxy.address);
    expect(await ops.taskCreator(task.taskId)).to.be.eql(userAddress);

    await executeAndCompareCount(task);
  });

  it("non owner cannot create task with proxy", async () => {
    await expect(
      createTaskWithProxy(user2, opsProxy.address)
    ).to.be.revertedWith("OpsProxy: Not authorised");
  });

  it("cancel tasks with proxy", async () => {
    const taskIds = await ops.getTaskIdsByUser(userAddress);
    const datas = [];
    const targets = [];
    const values = [];

    for (const taskId of taskIds) {
      datas.push(ops.interface.encodeFunctionData("cancelTask", [taskId]));
      targets.push(ops.address);
      values.push(0);
    }

    await opsProxy.connect(user).batchExecuteCall(targets, datas, values);

    const tasks = await ops.getTaskIdsByUser(userAddress);
    expect(tasks.length).to.be.eql(0);
  });

  //---------------------------------Helper functions---------------------------
  const executeAndCompareCount = async (task: TaskDetails) => {
    await fastForwardTime();

    const countBefore = await counter.count();

    await ops
      .connect(executor)
      .exec(
        txFee,
        ETH,
        task.taskCreator,
        task.isUseTaskTreasury,
        true,
        task.resolverHash,
        task.execAddress,
        task.execData
      );

    const countAfter = await counter.count();
    expect(countAfter).to.be.gt(countBefore);
  };

  const createTaskForProxy = async (
    signer: Signer,
    proxyAddress: string
  ): Promise<TaskDetails> => {
    const task = await getTaskDetails(signer, proxyAddress);

    await expect(
      ops
        .connect(signer)
        .createTask(
          task.execAddress,
          task.execSelector,
          task.resolverAddress,
          task.resolverData
        )
    )
      .to.emit(ops, "TaskCreated")
      .withArgs(
        task.taskCreator,
        task.execAddress,
        task.execSelector,
        task.resolverAddress,
        task.taskId,
        task.resolverData,
        task.isUseTaskTreasury,
        task.feeToken,
        task.resolverHash
      );

    return task;
  };

  const createTaskWithProxy = async (
    signer: Signer,
    proxyAddress: string
  ): Promise<TaskDetails> => {
    const task = await getTaskDetails(signer, proxyAddress);

    const createTaskData = ops.interface.encodeFunctionData("createTask", [
      task.execAddress,
      task.execSelector,
      task.resolverAddress,
      task.resolverData,
    ]);

    await expect(
      opsProxy.connect(signer).executeCall(ops.address, createTaskData, 0)
    )
      .to.emit(ops, "TaskCreated")
      .withArgs(
        task.taskCreator,
        task.execAddress,
        task.execSelector,
        task.resolverAddress,
        task.taskId,
        task.resolverData,
        task.isUseTaskTreasury,
        task.feeToken,
        task.resolverHash
      );

    return task;
  };

  const getTaskDetails = async (
    signer: Signer,
    proxyAddress: string
  ): Promise<TaskDetails> => {
    const taskCreator = await signer.getAddress();

    const execAddress = proxyAddress;
    const execSelector =
      opsProxyImplementation.interface.getSighash("executeCall");
    const increaseCountData = counter.interface.encodeFunctionData(
      "increaseCount",
      [5]
    );

    const execData = opsProxyImplementation.interface.encodeFunctionData(
      "executeCall",
      [counter.address, increaseCountData, 0]
    );

    const resolverAddress = ZERO_ADDRESS;
    const resolverData = "0x00";
    const resolverHash = await ops.getResolverHash(
      resolverAddress,
      resolverData
    );
    const isUseTaskTreasury = true;
    const feeToken = ZERO_ADDRESS;
    const taskId = await ops.getTaskId(
      taskCreator,
      execAddress,
      execSelector,
      isUseTaskTreasury,
      feeToken,
      resolverHash
    );

    return {
      taskCreator,
      execAddress,
      execSelector,
      execData,
      resolverAddress,
      resolverData,
      resolverHash,
      feeToken,
      isUseTaskTreasury,
      taskId,
    };
  };
});

const setupFork = async () => {
  await hre.network.provider.request({
    method: "hardhat_reset",
    params: [
      {
        forking: {
          jsonRpcUrl: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_ID}`,
          blockNumber: 14607294,
        },
      },
    ],
  });
};

const fastForwardTime = async () => {
  await ethers.provider.send("evm_increaseTime", [300]);
  await ethers.provider.send("evm_mine", []);
};

type TaskDetails = {
  taskCreator: string;
  execAddress: string;
  execSelector: string;
  execData: string;
  resolverAddress: string;
  resolverData: string;
  resolverHash: string;
  feeToken: string;
  isUseTaskTreasury: boolean;
  taskId: string;
};
