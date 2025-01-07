import { HardhatRuntimeEnvironment } from "hardhat/types";
import { getAccount, getPublicClient, getWallet } from "./utils";
import TechBitesContract from "../artifacts-zk/contracts/TechBites.sol/TechBites.json";
import TipManagerContract from "../artifacts-zk/contracts/TipManager.sol/TipManager.json";
import { get } from "http";

export default async function (hre: HardhatRuntimeEnvironment) {
  const account = getAccount(`${process.env.PRIVATE_KEY}`);
  //deploy the TechBites contract
  const techBitesReceipt = await deployContractFixture(hre, TechBitesContract, [account.address]);
  //deploy the TipManager contract
  const tipManagerReceipt = await deployContractFixture(hre, TipManagerContract, [techBitesReceipt.contractAddress, account.address]);

  return [techBitesReceipt.contractAddress, tipManagerReceipt.contractAddress];
}

async function deployContractFixture(hre: HardhatRuntimeEnvironment, Contract: any, args: any[] = []) {
  const { contractName, abi, bytecode } = Contract;

  const wallet = getWallet();
  const account = getAccount(`${process.env.PRIVATE_KEY}`);
  const hash = await wallet.deployContract({
    abi,
    account: account,
    args: args,
    bytecode: bytecode as `0x${string}`,
  });

  const receipt = await getPublicClient().waitForTransactionReceipt({ hash });

  console.log(`
  🚀 ${contractName} successfully deployed:
  📄 Contract Address: ${receipt.contractAddress}
  🔗 Transaction Hash: ${receipt.transactionHash}
  🌐 Network: ${hre.network.name}
  `);

  return receipt;
}
