const { assert } = require("chai")
const { deployments, getNamedAccounts } = require("hardhat")

describe("Basic NFT testing", async () => {
    let deployer, basicNft

    beforeEach(async () => {
        accounts = await ethers.getSigners()
        deployer = accounts[0]

        await deployments.fixture(["all"])

        basicNft = await ethers.getContract("BasicNft", deployer.address)
    })

    describe("Construtor", () => {
        it("Initializes the NFT Correctly.", async () => {
            const name = await basicNft.name()
            const symbol = await basicNft.symbol()
            const tokenCounter = await basicNft.getTokenCounter()
            assert.equal(name, "Dogie")
            assert.equal(symbol, "DOG")
            assert.equal(tokenCounter.toString(), "0")
        })
    })

    describe("Mint NFT", async () => {
        beforeEach(async () => {
            const txResponse = await basicNft.mintNft()
            await txResponse.wait(1)
        })
        it("Allows users to mint an NFT, and updates appropriately", async function () {
            const tokenURI = await basicNft.tokenURI(0)
            const tokenCounter = await basicNft.getTokenCounter()

            assert.equal(tokenCounter.toString(), "1")
            assert.equal(tokenURI, await basicNft.TOKEN_URI())
        })
        it("Show the correct balance and owner of an NFT", async function () {
            const deployerAddress = deployer.address
            const deployerBalance = await basicNft.balanceOf(deployerAddress)
            const owner = await basicNft.ownerOf("0")

            assert.equal(deployerBalance.toString(), "1")
            assert.equal(owner, deployerAddress)
        })
    })
})
