
// smart contarct test
require('@nomiclabs/hardhat-waffle')



module.exports={
  solidity:'0.8.0',
  networks:{
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/kJbi9eGiKVGPrPyam5YdtBlW06jKrBuK',
      accounts:['6dc5b344764952e87c6822486675afa2c2ffa80a894b17e21b92e552a257dcf4']
    }
  }
}
