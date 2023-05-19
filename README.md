uthor: lgg
- CreateTime: 2022-12-21 04:10
- Day: [[ 2022-12-21-星期三 ]] 
- Tags: #react #vite #solidity #ethereum
- Introducer: youtube 上看的一个搭建 web 3 app 的视频教程用到  [[Solidity]] 和区块链进行交互, 主要使用 react 做前端, 然后和 metamask 交互,同 [[Ethereum]] 通过 ether. js 交互学习的点
1. 如何和 metamask 交互
2. 如何通过 ether. js 同以太坊进行交互
---

# react 项目
## 环境
-  [[vite]] 
```shell
npm init vite@lates
npm install 
npm run dev
```

css 样式的工具是 : [[tailwindcss]]
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
- 智能合约的框架用的是 [[Hardhat]]
![[Hardhat#创建项目]] 

- 创建项目
```shell
npx hardhat
```
## 相关网站
- Ropsten Ethereum Faucet 
可以通过这个在 metamask 切换到 `Ropsten Tegt Network` 在这个网站获取一些代币 

- alchemy
让区块链部署更加方便的网站, 得到 Ropsten 的区块链网络



## 合约
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
