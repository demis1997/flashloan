const { expect } = require("chai");
const { ethers } = require("hardhat");


const DAI = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063";
const DAI_account = "0xdfD74E3752c187c4BA899756238C76cbEEfa954B";
const POOL_ADDRESS_PROVIDER = "0xa97684ead0e402dc232d5a977953df7ecbab3cdb";

describe("Storage", function () {
  it("test initial value", async function () {
    const SimpleFlashLoan = await ethers.getContractFactory("SimpleFlashLoan");
    let simpleFlashLoan = SimpleFlashLoan.attach("0x45C823850AeB23E2ed11c9105d5f666C0BD539d1")

    const token = await ethers.getContractAt("IERC20", DAI);
    const BALANCE_AMOUNT_DAI = ethers.utils.parseEther("2000");

    const tx = await simpleFlashLoan.createFlashLoan(DAI, ethers.utils.parseEther("1000")); // Borrow 1000 DAI in a Flash Loan with no upfront collateral
    await tx.wait();
    const remainingBalance = await token.balanceOf(simpleFlashLoan.address); // Check the balance of DAI in the Flash Loan contract afterwards
    console.log(`remaining balance: ${remainingBalance}`)
    expect(remainingBalance.lt(BALANCE_AMOUNT_DAI)).to.be.true;
  });
});