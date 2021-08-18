/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PokeMe, PokeMeInterface } from "../PokeMe";

const _abi = [
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_gelato",
        type: "address",
      },
      {
        internalType: "address",
        name: "_taskTreasury",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "txFee",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "feeToken",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "execAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "execData",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "taskId",
        type: "bytes32",
      },
    ],
    name: "ExecSuccess",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "taskId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "taskCreator",
        type: "address",
      },
    ],
    name: "TaskCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "taskCreator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "execAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes4",
        name: "selector",
        type: "bytes4",
      },
      {
        indexed: false,
        internalType: "address",
        name: "resolverAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "taskId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "resolverData",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "useTaskTreasuryFunds",
        type: "bool",
      },
    ],
    name: "TaskCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_taskId",
        type: "bytes32",
      },
    ],
    name: "cancelTask",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_execAddress",
        type: "address",
      },
      {
        internalType: "bytes4",
        name: "_execSelector",
        type: "bytes4",
      },
      {
        internalType: "address",
        name: "_resolverAddress",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_resolverData",
        type: "bytes",
      },
      {
        internalType: "bool",
        name: "_useTaskTreasuryFunds",
        type: "bool",
      },
    ],
    name: "createTask",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_txFee",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_feeToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_taskCreator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_useTaskTreasuryFunds",
        type: "bool",
      },
      {
        internalType: "address",
        name: "_execAddress",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_execData",
        type: "bytes",
      },
    ],
    name: "exec",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "execAddresses",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "gelato",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_func",
        type: "string",
      },
    ],
    name: "getSelector",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_taskCreator",
        type: "address",
      },
      {
        internalType: "address",
        name: "_execAddress",
        type: "address",
      },
      {
        internalType: "bytes4",
        name: "_selector",
        type: "bytes4",
      },
      {
        internalType: "bool",
        name: "_useTaskTreasuryFunds",
        type: "bool",
      },
    ],
    name: "getTaskId",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_taskCreator",
        type: "address",
      },
    ],
    name: "getTaskIdsByUser",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "taskCreator",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "taskTreasury",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60c06040523480156200001157600080fd5b5060405162001dd938038062001dd98339818101604052810190620000379190620000dd565b818073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1660601b81525050508073ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff1660601b8152505050506200019a565b600081519050620000c08162000166565b92915050565b600081519050620000d78162000180565b92915050565b60008060408385031215620000f157600080fd5b60006200010185828601620000c6565b92505060206200011485828601620000af565b9150509250929050565b60006200012b8262000146565b9050919050565b60006200013f8262000146565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b62000171816200011e565b81146200017d57600080fd5b50565b6200018b8162000132565b81146200019757600080fd5b50565b60805160601c60a05160601c611c05620001d4600039600081816105fc01526109e0015260008181610400015261073a0152611c056000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c8063624e984811610071578063624e9848146101665780636d2dd29f1461019657806380a003ff146101c6578063ced2803a146101f6578063e60a321314610212578063ee8ca3b514610230576100a9565b80630407145c146100ae5780632e6e0bd0146100de57806350f313651461010e57806354fd4d501461012a578063573ea57514610148575b600080fd5b6100c860048036038101906100c3919061117b565b61024c565b6040516100d591906117e7565b60405180910390f35b6100f860048036038101906100f39190611299565b6103cb565b60405161010591906116bd565b60405180910390f35b61012860048036038101906101239190611307565b6103fe565b005b6101326106ff565b60405161013f919061189a565b60405180910390f35b610150610738565b60405161015d91906116d8565b60405180910390f35b610180600480360381019061017b91906111a4565b61075c565b60405161018d9190611809565b60405180910390f35b6101b060048036038101906101ab9190611299565b610795565b6040516101bd91906116bd565b60405180910390f35b6101e060048036038101906101db91906112c2565b6107c8565b6040516101ed919061184d565b60405180910390f35b610210600480360381019061020b9190611207565b6107ea565b005b61021a6109de565b60405161022791906116bd565b60405180910390f35b61024a60048036038101906102459190611299565b610a02565b005b60606000610297600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020610b9b565b905060008167ffffffffffffffff8111156102db577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280602002602001820160405280156103095781602001602082028036833780820191505090505b50905060005b828110156103c05761036881600260008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020610bb090919063ffffffff16565b8282815181106103a1577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101818152505080806103b890611ad3565b91505061030f565b508092505050919050565b60006020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461048c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610483906118bc565b60405180910390fd5b60006104a3868561049d8686610bc7565b8861075c565b90508573ffffffffffffffffffffffffffffffffffffffff1660008083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610545576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161053c906118dc565b60405180910390fd5b60008473ffffffffffffffffffffffffffffffffffffffff16848460405161056e9291906116a4565b6000604051808303816000865af19150503d80600081146105ab576040519150601f19603f3d011682016040523d82523d6000602084013e6105b0565b606091505b50509050806105f4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105eb906118fc565b60405180910390fd5b851561068a577f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16636f192acc898b8a6040518463ffffffff1660e01b8152600401610657939291906117b0565b600060405180830381600087803b15801561067157600080fd5b505af1158015610685573d6000803e3d6000fd5b505050505b8473ffffffffffffffffffffffffffffffffffffffff168873ffffffffffffffffffffffffffffffffffffffff168a7ff5785831cc21ed1a6e74f60bd9268a70a7a3f3fc03c815dba22ceda33aea26ce8787876040516106ec93929190611868565b60405180910390a4505050505050505050565b6040518060400160405280600181526020017f330000000000000000000000000000000000000000000000000000000000000081525081565b7f000000000000000000000000000000000000000000000000000000000000000081565b600084848484604051602001610775949392919061176b565b604051602081830303815290604052805190602001209050949350505050565b60016020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600082826040516107da9291906116a4565b6040518091039020905092915050565b60006107f83388888561075c565b9050600073ffffffffffffffffffffffffffffffffffffffff1660008083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461089b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108929061193c565b60405180910390fd5b6108ec81600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020610dd590919063ffffffff16565b503360008083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550866001600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f6139aea80ba5a22ec0d96fd5d76b3ffc9f1c477e316020e4677ab47e26a50ad133888888858989896040516109cd9897969594939291906116f3565b60405180910390a150505050505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b3373ffffffffffffffffffffffffffffffffffffffff1660008083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610aa2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a999061191c565b60405180910390fd5b610af381600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020610dec90919063ffffffff16565b5060008082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001600082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690557f44d83729a43f9c6046446df014d073dd242e0ad672071e9b292f31b669c25b098133604051610b90929190611824565b60405180910390a150565b6000610ba982600001610e03565b9050919050565b6000610bbf8360000183610e14565b905092915050565b6000601883836003818110610c05577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9050013560f81c60f81b7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916901c601084846002818110610c8e577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9050013560f81c60f81b7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916901c600885856001818110610d17577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9050013560f81c60f81b7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916901c85856000818110610d9e577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9050013560f81c60f81b7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916171717905092915050565b6000610de48360000183610e65565b905092915050565b6000610dfb8360000183610ed5565b905092915050565b600081600001805490509050919050565b6000826000018281548110610e52577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200154905092915050565b6000610e71838361105b565b610eca578260000182908060018154018082558091505060019003906000526020600020016000909190919091505582600001805490508360010160008481526020019081526020016000208190555060019050610ecf565b600090505b92915050565b6000808360010160008481526020019081526020016000205490506000811461104f576000600182610f0791906119cd565b9050600060018660000180549050610f1f91906119cd565b9050818114610fda576000866000018281548110610f66577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200154905080876000018481548110610fb0577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b90600052602060002001819055508387600101600083815260200190815260200160002081905550505b85600001805480611014577f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b600190038181906000526020600020016000905590558560010160008681526020019081526020016000206000905560019350505050611055565b60009150505b92915050565b600080836001016000848152602001908152602001600020541415905092915050565b60008135905061108d81611b5c565b92915050565b6000813590506110a281611b73565b92915050565b6000813590506110b781611b8a565b92915050565b6000813590506110cc81611ba1565b92915050565b60008083601f8401126110e457600080fd5b8235905067ffffffffffffffff8111156110fd57600080fd5b60208301915083600182028301111561111557600080fd5b9250929050565b60008083601f84011261112e57600080fd5b8235905067ffffffffffffffff81111561114757600080fd5b60208301915083600182028301111561115f57600080fd5b9250929050565b60008135905061117581611bb8565b92915050565b60006020828403121561118d57600080fd5b600061119b8482850161107e565b91505092915050565b600080600080608085870312156111ba57600080fd5b60006111c88782880161107e565b94505060206111d98782880161107e565b93505060406111ea878288016110bd565b92505060606111fb87828801611093565b91505092959194509250565b60008060008060008060a0878903121561122057600080fd5b600061122e89828a0161107e565b965050602061123f89828a016110bd565b955050604061125089828a0161107e565b945050606087013567ffffffffffffffff81111561126d57600080fd5b61127989828a016110d2565b9350935050608061128c89828a01611093565b9150509295509295509295565b6000602082840312156112ab57600080fd5b60006112b9848285016110a8565b91505092915050565b600080602083850312156112d557600080fd5b600083013567ffffffffffffffff8111156112ef57600080fd5b6112fb8582860161111c565b92509250509250929050565b600080600080600080600060c0888a03121561132257600080fd5b60006113308a828b01611166565b97505060206113418a828b0161107e565b96505060406113528a828b0161107e565b95505060606113638a828b01611093565b94505060806113748a828b0161107e565b93505060a088013567ffffffffffffffff81111561139157600080fd5b61139d8a828b016110d2565b925092505092959891949750929550565b60006113ba8383611451565b60208301905092915050565b6113cf81611a13565b82525050565b6113de81611a01565b82525050565b60006113ef8261196c565b6113f9818561198f565b93506114048361195c565b8060005b8381101561143557815161141c88826113ae565b975061142783611982565b925050600181019050611408565b5085935050505092915050565b61144b81611a25565b82525050565b61145a81611a31565b82525050565b61146981611a31565b82525050565b61147881611a3b565b82525050565b600061148a83856119a0565b9350611497838584611a91565b6114a083611b4b565b840190509392505050565b60006114b783856119b1565b93506114c4838584611a91565b82840190509392505050565b60006114db82611977565b6114e581856119bc565b93506114f5818560208601611aa0565b6114fe81611b4b565b840191505092915050565b60006115166017836119bc565b91507f47656c61746f666965643a204f6e6c792067656c61746f0000000000000000006000830152602082019050919050565b6000611556601b836119bc565b91507f506f6b654d653a20657865633a204e6f207461736b20666f756e6400000000006000830152602082019050919050565b6000611596601e836119bc565b91507f506f6b654d653a20657865633a20457865637574696f6e206661696c656400006000830152602082019050919050565b60006115d66031836119bc565b91507f506f6b654d653a2063616e63656c5461736b3a2053656e64657220646964206e60008301527f6f74207374617274207461736b207965740000000000000000000000000000006020830152604082019050919050565b600061163c602f836119bc565b91507f506f6b654d653a206372656174655461736b3a2053656e64657220616c72656160008301527f64792073746172746564207461736b00000000000000000000000000000000006020830152604082019050919050565b61169e81611a87565b82525050565b60006116b18284866114ab565b91508190509392505050565b60006020820190506116d260008301846113d5565b92915050565b60006020820190506116ed60008301846113c6565b92915050565b600060e082019050611708600083018b6113d5565b611715602083018a6113d5565b611722604083018961146f565b61172f60608301886113d5565b61173c6080830187611460565b81810360a083015261174f81858761147e565b905061175e60c0830184611442565b9998505050505050505050565b600060808201905061178060008301876113d5565b61178d60208301866113d5565b61179a604083018561146f565b6117a76060830184611442565b95945050505050565b60006060820190506117c560008301866113d5565b6117d26020830185611695565b6117df60408301846113d5565b949350505050565b6000602082019050818103600083015261180181846113e4565b905092915050565b600060208201905061181e6000830184611460565b92915050565b60006040820190506118396000830185611460565b61184660208301846113d5565b9392505050565b6000602082019050611862600083018461146f565b92915050565b6000604082019050818103600083015261188381858761147e565b90506118926020830184611460565b949350505050565b600060208201905081810360008301526118b481846114d0565b905092915050565b600060208201905081810360008301526118d581611509565b9050919050565b600060208201905081810360008301526118f581611549565b9050919050565b6000602082019050818103600083015261191581611589565b9050919050565b60006020820190508181036000830152611935816115c9565b9050919050565b600060208201905081810360008301526119558161162f565b9050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b600082825260208201905092915050565b60006119d882611a87565b91506119e383611a87565b9250828210156119f6576119f5611b1c565b5b828203905092915050565b6000611a0c82611a67565b9050919050565b6000611a1e82611a67565b9050919050565b60008115159050919050565b6000819050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b83811015611abe578082015181840152602081019050611aa3565b83811115611acd576000848401525b50505050565b6000611ade82611a87565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415611b1157611b10611b1c565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000601f19601f8301169050919050565b611b6581611a01565b8114611b7057600080fd5b50565b611b7c81611a25565b8114611b8757600080fd5b50565b611b9381611a31565b8114611b9e57600080fd5b50565b611baa81611a3b565b8114611bb557600080fd5b50565b611bc181611a87565b8114611bcc57600080fd5b5056fea264697066735822122099bbd88039ab82a97eff3887a1bb39218a9cb2edf26a8fcfaf941fa270bee34b64736f6c63430008000033";

export class PokeMe__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _gelato: string,
    _taskTreasury: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<PokeMe> {
    return super.deploy(
      _gelato,
      _taskTreasury,
      overrides || {}
    ) as Promise<PokeMe>;
  }
  getDeployTransaction(
    _gelato: string,
    _taskTreasury: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_gelato, _taskTreasury, overrides || {});
  }
  attach(address: string): PokeMe {
    return super.attach(address) as PokeMe;
  }
  connect(signer: Signer): PokeMe__factory {
    return super.connect(signer) as PokeMe__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PokeMeInterface {
    return new utils.Interface(_abi) as PokeMeInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): PokeMe {
    return new Contract(address, _abi, signerOrProvider) as PokeMe;
  }
}
