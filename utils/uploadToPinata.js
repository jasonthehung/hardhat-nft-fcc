const pinataSDK = require("@pinata/sdk").default
const path = require("path")
const fs = require("fs")
require("dotenv").config()

const pinataApiKey = process.env.PINATA_API_KEY
const pinataApiSecret = process.env.PINATA_API_SECRET
const pinata = new pinataSDK("yourPinataApiKey", "yourPinataSecretApiKey")

async function storeImages(imagesfilePath) {
    const fullImagesPath = path.resolve(imagesfilePath)
    const files = fs.readdirSync(fullImagesPath)

    console.log("Uploading to IPFS!")

    let responses = []

    for (fileIndex in files) {
        const readableStreamForFile = fs.createReadStream(
            `${fullImagesPath}/${files[fileIndex]}`
        )

        try {
            const response = await pinata.pinFileToIPFS(readableStreamForFile)
            response.push(responses)
        } catch (err) {
            console.log(err)
        }
    }
    return { responses, files }
}

module.exports = { storeImages }
