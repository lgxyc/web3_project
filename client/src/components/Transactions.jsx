import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import dummyData from "../utilis/dummyData";
import { shortenAddress } from "../utilis/shortenAddress";
import useFetch from '../hooks/useFetch';

const TransactionCard = ({ addressTo, addressFrom, timestamp, amount, message, keyword, url }) => {
    const gifUrl = useFetch({ keyword });
    return (
        <div className="bg-[#181918] m-4 flex flex-1
            2xl:min-w-[450px]
            2xl:max-w-[500px]
            sm:min-w-[270px]
            sm:max-w-[300px]
            min-w-full
            flex-col p-3 rounded-md hover:shadow-2xl">
            <div className="flex flex-col items-center w-full mt-3">
                {/* 显示区块链信息 开始 */}
                <div className="display-flex justify-start w-full mb-6 p-2">
                    <a href={`https://goerli.etherscan.io/address/${addressFrom}`}></a>
                    <p className="text-white text-base">
                        From:{shortenAddress(addressFrom)}
                    </p>
                    <a href={`https://goerli.etherscan.io/address/${addressTo}`}></a>
                    <p className="text-white text-base">
                        To:{shortenAddress(addressTo)}
                    </p>
                    <p className="text-white text-base">Amount:{amount}</p>
                    <p classname="text-white text-base">
                        {
                            message && (
                                <>
                                    <br />
                                    <p className="text-white text-base">Message: {message}</p>
                                </>
                            )
                        }
                    </p>
                </div>
                {/* 显示区块链信息 结束 */}

                <img
                        src={gifUrl || url}
                        alt="gif"
                        classname="w-full h-64 2x:h-96 rounded-md shadow-lg object-cover"
                    />
                    <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
                        <p className="text-[#37c7da] font-bold">{timestamp}</p>
                    </div>
            </div>
        </div>
    )
};

const Transactions = () => {

    const { transactions, currentAccount } = useContext(TransactionContext);

    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 py-12 px-4">
                {currentAccount ? (
                    <h3 className="text-white text-3xl text-center my-2">
                        Latest Transactions
                    </h3>
                ) : (
                    <h3 className="text-white text-3xl text-center my-2">
                        Connect your account to see the latest transactions
                    </h3>
                )}

                <div className="flex flex-wrap justify-center items-center mt-10">
                    {
                        transactions.reverse().map((transaction, i) => (
                            <TransactionCard key={i} {...transaction}>

                            </TransactionCard>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Transactions;