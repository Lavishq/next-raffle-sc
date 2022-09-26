const contractAddress = require("./contractAddress.json")
const abi = require("./abi.json")

module.exports = {
    abi,
    contractAddress,
}

/* default contract that was programatically updated
 * but couldn't update testnet contract in contractAddress.json
 * so i manually copy pasted from github to my own repo */
// {"31337":["0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"]}
