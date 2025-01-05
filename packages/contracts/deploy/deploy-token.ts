import { deployContract, getWallet } from "./utils";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async function (hre: HardhatRuntimeEnvironment) {
  // Obtener la wallet conectada
  const wallet = getWallet();

  console.log("Deploying contract with wallet:", wallet.address);

  // Desplegar el contrato "Token"
  await deployContract("Token", [], {
    hre,
    wallet,
    verify: true, // Verifica automáticamente el contrato después del despliegue
  });

  console.log("Token deployed successfully!");
}
