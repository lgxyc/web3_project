import React, { useEffect, useState } from 'react';

import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utilis/constans'


export const TransactionContext = React.createContext();


// metamask 在控制台的info存在可以访问的访问区块链的对象
const { ethereum } = window;



const getAllTransactions = async () => {
    try {
        if (!ethereum) {
            return alert("Please install metamask");
        }
        const contract = getEhtonumContract();
        const avaliableTransactions = await contract.getAllTransactinos();

        const transactionArr = avaliableTransactions.map((transaction)=>(
            {
                addressTo: transaction.receiver,
                addressFrom:transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message:tansaction.message,
                keyword:transaction.keyword,
                amount:parseInt(transaction.amount._hex)/(10 **18)
            }
        ));


        console.log(transactionArr);

        setTransactions(transactionArr);

    } catch (error) {

    }
}
const getEtherumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({
        provider,
        signer,
        transactionContract
    });
    return transactionContract;
}
export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
    const [transactions,setTransactions] = useState([])
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    // 动态监听表格内容,按照对应的 name：value
    const handleChange = (e, name) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: e.target.value
        }));
    }
    // check if you already have an account before performing the connect wallet 
    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) {
                return alert("Please install metamask");
            }
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                getAllTransactions();
            } else {
                console.log("No account found");
            }
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }

    }
    const checkIfTransactionExist = async () => {
        try {
            const contract = getEtherumContract();
            const transactionCount = await contract.getTransactionCount();
            window.localStorage.setItem('transactionCount',transactionCount);
        }
        catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }

    }
    // connect wallet operate
    const connectWallet = async () => {
        try {
            if (!ethereum) {
                return alert("Please install metamask");
            }
            // connect to matemask
            const accounts = await ethereum.request({ method: "eth_requestAccounts", });
            setCurrentAccount(accounts[0]);

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");

        }
    }
    const sendTransaction = async () => {
        try {
            if (!ethereum) {
                return alert("Please install metamask");
            }

            const { addressTo, amount, keyword, message } = formData;
            const contract = getEtherumContract();
            const parsedAmount = ethers.utils.parseEther(amount);
            await ethereum.request(
                {
                    method: 'eth_sendTransaction',
                    params: [{
                        from: currentAccount,
                        to: addressTo,
                        gas: '0x5208',
                        value: parsedAmount._hex,
                    }]
                }
            )
            const transactionResult = await contract.addToBlockChain(addressTo, parsedAmount, message, keyword);

            setIsLoading(true);
            console.log(`Loading - ${transactionResult.hash}`)
            await transactionResult.wait();
            console.log(`Success - ${transactionResult.hash}`);
            setIsLoading(false);

            const transactionCount = await contract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());


        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    }
    // load application check wall conncect
    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionExist();
    }, [])
    return (
        <TransactionContext.Provider value={{
            connectWallet,
            currentAccount,
            formData,
            setFormData,
            handleChange,
            sendTransaction,
            transactions,
            transactionCount,
            isLoading
        }}>
            {children}
        </TransactionContext.Provider>
    )

}