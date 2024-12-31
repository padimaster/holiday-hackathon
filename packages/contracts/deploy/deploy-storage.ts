import { HardhatRuntimeEnvironment } from "hardhat/types";
import { getAccount, getPublicClient, getWallet } from "./utils";
import contract from "../artifacts-zk/contracts/Storage.sol/Storage.json";

export default async function (hre: HardhatRuntimeEnvironment) {
  const { contractName, abi, bytecode } = contract;

  const wallet = getWallet();
  const account = getAccount();

  console.log(account.address);
  const initialValue = 69420;
  const hash = await wallet.deployContract({
    abi,
    account: account,
    args: [initialValue],
    bytecode: bytecode as `0x${string}`,
  });

  const receipt = await getPublicClient().waitForTransactionReceipt({ hash });

  console.log(`
🚀 ${contractName} successfully deployed:
📄 Contract Address: ${receipt.contractAddress}
🔗 Transaction Hash: ${receipt.transactionHash}
🔢 Initial Value: ${initialValue}
🌐 Network: ${hre.network.name}
  `);
}
