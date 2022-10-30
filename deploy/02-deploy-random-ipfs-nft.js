const { network, ethers } = require("hardhat")
const { devChains, networkConfig } = require("../helper-hardhat-config")
const { storeImages } = require("../utils/uploadToPinata")

const imagesLocation = "./images/randomNft"

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = await deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    let tokenUris
    // Get the IPFS hashes of the images
    if (process.env.UPLOAD_TO_PINATA == "true") {
        tokenUris = await handleTokenUris()
    }

    let vrfCoordinatorV2Address, subscriptionId

    if (devChains.includes(network.name)) {
        const vrfCoordinatorV2Mock = await ethers.getContract(
            "VRFCoordinatorV2Mock"
        )

        vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address

        const txRespone = await vrfCoordinatorV2Mock.createSubscription()

        const txReceipt = await txRespone.wait(1)

        subscriptionId = txReceipt.events[0].args.subId.toString()
    } else {
        vrfCoordinatorV2Address = networkConfig[chainId].vrfCoordinatorV2
        subscriptionId = networkConfig[chainId].subscriptionId
    }

    log("----------------------------------")

    await storeImages(imagesLocation)

    // const args = [
    //     vrfCoordinatorV2Address,
    //     subscriptionId,
    //     networkConfig[chainId].gasLane,
    //     networkConfig[chainId].callbackGasLimit,
    //     networkConfig[chainId].mintFee,
    // ]
}

async function handleTokenUris() {
    tokenUris = []

    // Store the Image in IPFS

    return tokenUris
}

module.exports.tags = ["all", "randomipfs", "main"]
