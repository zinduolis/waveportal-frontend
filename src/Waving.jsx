import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "./utils/WavePortal.json";
import "./css/App.css";

const Waving = () => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [allWaves, setAllWaves] = useState([])
  const [totalWaves, setTotalWaves] = useState(0);
  const contractAddress = "0xC9DCC7B0288FBb4fedd8915Bc1D72aD4df0a6479";
  const contractABI = abi.abi;
  
  
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      
      if (!ethereum) {
        console.log("Make sure you have metamask!");
      } else {
        console.log("We have the ethereum object", ethereum);
      }
      const accounts = await ethereum.request({ method: "eth_accounts"});

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    } 
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  const wave = async () => {
    try{
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        
        const waveTxn = await wavePortalContract.wave("I am waving");
        console.log("Mining...", waveTxn.hash);
        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        let count = await wavePortalContract.getTotalWaves();
        setTotalWaves(count.toNumber());
        console.log("Retrieved total wave count...", count.toNumber());
      
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getWaveCount = async () => {
    try{
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await wavePortalContract.getTotalWaves();
        setTotalWaves(count.toNumber());
      
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  } 

  const getAllWaves = async () => {
    try{
        const {ethereum} = window;
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

          const waves = await wavePortalContract.getAllWaves();

          let wavesCleaned = [];
          waves.forEach(wave => {
            wavesCleaned.push({
              address: wave.waver,
              timestamp: new Date(wave.timestamp * 1000),
              message: wave.message
            });
          });

          setAllWaves(wavesCleaned);
    } else {
      console.log("Ethereum object doesn't exist!");
      }
    }  
    catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    checkIfWalletIsConnected().then(getWaveCount());
  }, [])

  return (
  <div className="bg-black dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
    <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">        
      <div className="p-6 max-w-sm mx-auto bg-emerald rounded-xl shadow-xl flex items-center space-x-10">  
          👋 Hey there! 
        </div>
        <div className="bio">
            Connect your Ethereum wallet and wave at me from Goerli Network!
        </div>
        <div className="datacontainer">
        {
          !currentAccount
        ? (
          <div className="lds-hourglass"> 
            Loading...
          </div>
          )
        : (
          <div className="boxCounter">
            <p> 🌊 {totalWaves} </p>
          </div>
          )
        }          
      </div>
      <div className="bio">
          {
            currentAccount && (
              <button className="waveButton" onClick={wave}>
                Wave at Me
              </button>
          )}        
  
          {
            !currentAccount && (
              <button className="waveButton" onClick={connectWallet}>
                Connect Wallet
              </button>     
        )}
      </div>

      {allWaves.map((wave, index) => {
        return (
          <div key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px"}}>
            <div> Address: {wave.address}</div>
            <div>Time: {wave.timestamp.toString()}</div>
            <div>Message: {wave.message}</div>
          </div>
        )
      })}
    </div>
  </div>
  );
}

export default Waving;