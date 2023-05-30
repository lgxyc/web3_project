
# web3s 项目
## 前言
跟着youtube的一个web3教程,基本项目前端用的是`react + vite + tailwindcss`,在网站部署一个区块链测试,通过提供的rpc钥匙,调用ehterjs就存储对应的数据内容就可以

## 环境
-  [[vite]] 
```shell
npm init vite@lates
npm install 
npm run dev
```

css 样式的工具是 : tailwindcss
```shell
npm install -D tailwindcss postcss autoprefixernpx
npx tailwindcss init -p
```
- 安装依赖 react 和 ethersjs 
```shell
npm install react-icons ethers
```


# 区块链

## 智能合约环境
- 智能合约的框架用的是 Hardhat
- 创建项目
```shell
npm install
npx hardhat
```
## 测试区块链网站
- Ropsten Ethereum Faucet 
可以通过这个在 metamask 切换到 `Ropsten Tegt Network` 在这个网站获取一些代币 

- alchemy
让区块链部署更加方便的网站, 得到 Ropsten 的区块链网络



## 合约部署
- 首先需要配置测试网络
通过 hardhat-waffle 配置测试网络
`url` : 测试网络通过 `alchemy` 申请得到
`accounts` : metamask 账号 
- 文件名?

```shell
require('@nomiclabs/hardhat-waffle');
module.exports={
solidity: '0.8.0';
networks:{
	ropsten:{
		url: 'xxxxx'
		accounts: ['xxxxx']
	}
}
}
```

- 部署合约在测试网络
这样在运行测试的时候可以采用配置好的网络 `ropsten` 进行测试
```shell
npx hardhat run scripts/deploy.js --network ropsten
```

- 部署之后得到 abi, 通过 abi 对合约进行调用





# Reference
- [视频地址](https://www.youtube.com/watch?v=Wn_Kb3MR_cU&t=5741s)  
- [作者的项目github地址](https://github.com/adrianhajdin/project_web3.0)
- 动态图片网站： https://developers.giphy.com/
