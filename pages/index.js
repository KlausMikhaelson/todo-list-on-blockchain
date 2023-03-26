import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import TaskAbi from "../../backend/build/contracts/todoContract.json"
import { todoContractaddress } from '@/config'
import {ethers} from "ethers";
import { useState } from 'react'
import Connectwallet from '@/components/Connectwallet'

export default function Home() {

  const [correctNetwork, setCorrectNetwork] = useState(false)
  const [isUserloggedIn, setIsUserLoggedIn] = useState(false)
  const [currentAccount, setCurrentAccount] = useState('')

  const connectWallet = async () => {
    try {
      const {ethereum} = window;
      if(!ethereum) {
        console.log('Install MetaMask')
        return
      }
      let chainId = await ethereum.request({method: "eth_chainId"})
      console.log("connected to chain:", chainId)

      const goerli = '0x5'

      if(chainId !== goerli) {
        alert('Switch to Goerli Testnet')
        setCorrectNetwork(false)
        return
      } else {
        setCorrectNetwork(true)
      }

      const accounts = await ethereum.request({method: "eth_requestAccounts"})

      console.log("Found account", accounts[0])
      setIsUserLoggedIn(true);
      setCorrectNetwork(accounts[0]);

    } catch(err) {
      console.log(err)
    }
  }

  const addTasks = async e => {
    e.preventDefault()
    let task = {
      taskText: input,
      isDeleted: false,
    }
  }

  return (
    <>
    <Connectwallet connectWallet={connectWallet} />
    </>
  )
}
