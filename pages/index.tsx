import {
  ConnectWallet,
  useAddress,
  useContract,
  Web3Button,
} from '@thirdweb-dev/react';
import type { NextPage } from 'next';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  //내 주소 불러오기
  const myAddress = useAddress();
  //contract 연결
  const contractAddress = '0x8220C67737B9885bE0A18Da6cff4C599D967eF80';
  const { contract, isLoading } = useContract(contractAddress);

  //react hook이라는 기술
  //setCounter함수가 쓰이면 counter가 바뀜
  const [counter, setCounter] = useState<string | undefined>(undefined);

  //counter 가져오기 함수
  async function getCounter() {
    if (!contract) return;

    const counter = await contract.call('getCounter');
    setCounter(counter.toString());
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.connect}>
          <ConnectWallet />
        </div>
        <div className={styles.title}>
          <h3>우제혁의 카운터 앱</h3>
        </div>

        <div className={styles.description}>
          contract address: {contractAddress} <br />
          Host address: 0x7259EdfECeA1F69C388c9fb25daC8073911b1cA7 <br />
          Your adress: {myAddress}
        </div>

        <div className={styles.title}>contract</div>

        <p>My Address : {myAddress} </p>
        <h1>Counter Dapp</h1>
        <h3>{counter}</h3>

        <div className={styles.grid}>
          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={() => contract?.call('decrementCounter')}
            >
              <h1>-</h1>
            </Web3Button>
          </div>

          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={() => getCounter()}
            >
              <h1>Refresh Counter</h1>
            </Web3Button>
          </div>

          <br />

          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={() => contract?.call('incrementCounter')}
            >
              <h1>+</h1>
            </Web3Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

// import { ConnectWallet, useContract, Web3Button } from '@thirdweb-dev/react'
// import type { NextPage } from 'next'
// import { useState } from 'react'
// import styles from '../styles/Home.module.css'
// const Home: NextPage = () => {
//  const contractAddress = '0x8425CB106b5ef9B2475FE3428d6daaA645F01670'
//  const { contract } = useContract(contractAddress)
//  const [counter, setCounter] = useState<string | undefined>(undefined)
//  async function getCounter() {
//   if (!contract) return
//   const counter = await contract.call('getCounter')
//   setCounter(counter.toString())
//  }
//  return (
//   <div className={styles.container}>
//    <main className={styles.main}>
//     <h1>Counter Dapp</h1>
//     <h3>{counter}</h3>
//     <Web3Button
//      contractAddress={contractAddress}
//      action={() => getCounter()}
//     >
//      Refresh Counter
//     </Web3Button>
//     <br />
//     <Web3Button
//      contractAddress={contractAddress}
//      action={(contract) => contract.call('incrementCounter')}
//     >
//      Increment Counter
//     </Web3Button>
//    </main>
//   </div>
//  )
// }
// export default Home
