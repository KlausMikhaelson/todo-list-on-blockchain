import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import TaskAbi from "../../backend/build/contracts/todoContract.json"
import { todoContractaddress } from '@/config'
import {ethers} from "ethers";
import { useEffect, useState } from 'react'
import Connectwallet from '@/components/Connectwallet'
import Todo from './Todo'

export default function Home() {

  const [correctNetwork, setCorrectNetwork] = useState(false)
  const [isUserloggedIn, setIsUserLoggedIn] = useState(false)
  const [currentAccount, setCurrentAccount] = useState('')
  const [input, setInput] = useState('')
  const [tasks, setTasks] = useState([])
  const [isDeleted, setIsDeleted] = useState(false)

  useEffect(() => {
    connectWallet()
    getAlltasks()
  },[])

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
      setCurrentAccount(accounts[0]);

    } catch(err) {
      console.log(err)
    }
  }

  const addtask = async e => {
    e.preventDefault()
    let task = {
      taskText: input,
      isDeleted: false,
    }

    try {
      // it's actually metamask
      const {ethereum} = window;
      if(ethereum) {
        // console.log(ethereum)
        const provider = new ethers.providers.Web3Provider(ethereum);
        // console.log("provider")
        const signer = provider.getSigner()
        // console.log(signer)
        // now we will have access to all from our smart contract
        const TaskContract = new ethers.Contract(todoContractaddress, TaskAbi.abi, signer)

        TaskContract.addtask(task.taskText, task.isDeleted)
        .then(res => {
          setTasks([...tasks, task])
          console.log("Added task")
        })
        .catch(err => {
          console.log(err);
        })
      } else {
        console.log("Install MetaMask");
      }
    } catch(err) {
      console.log(err)
    }
  }

  const getAlltasks = async() => {
    try {
      const {ethereum} = window;
      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner()
        const TaskContract = new ethers.Contract(todoContractaddress, TaskAbi.abi, signer)

        let allTodos = await TaskContract.getMytasks()
        // console.log(allTodos)
        setTasks(allTodos)
      } else {
        console.log("Install MetaMask");
      }
    } catch(err) {
      console.log(err)
    }
    setInput('')
  }

  const deleteTask = key => async () => {
    try {
      const {ethereum} = window;
      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner()
        const TaskContract = new ethers.Contract(todoContractaddress, TaskAbi.abi, signer)

        const deleteTasktx = await TaskContract.deleteTask(key, true)
        console.log('succesfully deleted', deleteTasktx)

        let allTodos = await TaskContract.getMytasks()
        setTasks(allTodos)
      } else {
        console.log("Install MetaMask");
      }
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <>
    {!isUserloggedIn ? <Connectwallet connectWallet={connectWallet} />: correctNetwork ? <Todo tasks={tasks} input={input} deleteTask={deleteTask} setInput={setInput} addtask={addtask} /> : <h1>Switch to Goerli Testnet</h1>}
    </>
  )
}
