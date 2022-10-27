const { assert } = require("chai")
const { deployments, getNamedAccounts } = require("hardhat")

describe("Basic NFT testing", async () => {
    let deployer

    beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer

        await deployments.fixture(["all"])

        const basicNft = await ethers.getContract("BasicNft", deployer)
    })

    it("Testing", async () => {
        assert.equal("1", "1")
    })
})
