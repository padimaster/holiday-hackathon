import { expect } from "chai";
import * as hre from "hardhat";
import { type Contract, type Wallet } from "zksync-ethers";
import { getWallet, deployContract } from "../deploy/utils";

describe("Token", function () {
  // Definir las claves privadas (asegúrate de no compartir claves reales)
  const PRIVATE_KEYS = {
    owner: "0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110",
    recipient: "0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6",
    other: "0xa267530f49f8280200edf313ee7af6b827f2a8bce2897751d06a843f644967b1"
  };

  const owner = getWallet(PRIVATE_KEYS.owner);

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const token = await deployContract("Token", [], {
        wallet: owner,
        silent: true,
      });

      expect(await token.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const token = await deployContract("Token", [], {
        wallet: owner,
        silent: true,
      });

      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    const recipient = getWallet(PRIVATE_KEYS.recipient);
    let token: Contract;

    beforeEach(async function () {
      token = await deployContract("Token", [], {
        wallet: owner,
        silent: true,
      });
    });

    it("Should transfer tokens between accounts", async function () {
      const initialBalance = await token.balanceOf(owner.address);
      await token.transfer(recipient.address, 50);

      expect(await token.balanceOf(owner.address)).to.equal(
        initialBalance - 50n
      );
      expect(await token.balanceOf(recipient.address)).to.equal(50);
    });

    it("Should emit Transfer events", async function () {
      await expect(token.transfer(recipient.address, 50))
        .to.emit(token, "Transfer")
        .withArgs(owner.address, recipient.address, 50);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const empty = token.connect(recipient) as Contract;

      await expect(empty.transfer(owner.address, 1)).to.be.revertedWith(
        "Not enough tokens"
      );
    });
  });

  describe("Custom Functions", function () {
    let token: Contract;

    beforeEach(async function () {
      token = await deployContract("Token", [], {
        wallet: owner,
        silent: true,
      });
    });

    it("Should return the current wallet", async function () {
      expect(await token.getCurrentWallet()).to.equal(owner.address);
    });

    it("Should return the wallet of a poster", async function () {
      const otherWallet = getWallet(PRIVATE_KEYS.other);
      expect(await token.getWalletOfPoster(otherWallet.address)).to.equal(otherWallet.address);
    });

    it("Should allow the owner to send tokens", async function () {
      const recipient = getWallet(PRIVATE_KEYS.recipient);
      await token.sendTokens(recipient.address, 100);

      expect(await token.balanceOf(recipient.address)).to.equal(100);
    });

    it("Should fail if non-owner tries to send tokens", async function () {
      const nonOwner = token.connect(getWallet(PRIVATE_KEYS.other));
      const recipient = getWallet(PRIVATE_KEYS.recipient);
      
      await expect(nonOwner.sendTokens(recipient.address, 100)).to.be.reverted;
    });
  });
});