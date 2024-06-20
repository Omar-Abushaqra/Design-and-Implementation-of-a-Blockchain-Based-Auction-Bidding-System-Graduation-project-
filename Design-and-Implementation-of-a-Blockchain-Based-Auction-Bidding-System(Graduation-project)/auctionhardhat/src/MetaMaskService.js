import React, {useState} from 'react';
import { ethers } from "ethers";
import { contractABI } from "./AddressABI/contractABI";
import { any } from 'hardhat/internal/core/params/argumentTypes';

// Note: Don't import contractAddress here, as it's exported from another file
export const contractAddress = "0xd9048F975eBd33f259116efA42873EfEC88caC1e";
var itemNumber = 1;
  const { ethereum } = window;
  //const [sellerAddress, setSellerAddress] = useState('');




  async function connectMetamask(){
    const [paragraph1, setParagraph1] = useState("");
    if(window.ethereum !== "undefined") {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log(accounts[0]);
      setParagraph1(accounts[0]);
    }
  }

  let contractLottery;

  async function printFun(){
    const [paragraph2, setParagraph2] = useState(""); 

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    contractLottery = new ethers.Contract(contractAddress, contractABI, signer);
    const myData = await contractLottery.add(5);
    setParagraph2(myData.toString());
    //bonus:
    console.log(contractLottery.target);
  }


  async function addItemFun(sellerAddress) {
    const [paragraph4, setParagraph4] = useState("");

    try{

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      contractLottery = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await contractLottery.addItem(itemNumber , sellerAddress);
      console.log(`Transaction sent: ${tx.hash}`);
    
    // Wait for transaction confirmation
      await tx.wait();
      console.log('Transaction confirmed');
      setParagraph4(`Item ${itemNumber} added`);
      itemNumber = itemNumber + 1;

    }
    catch{
    setParagraph4("item has not been added");
    }
  }
  async function ItemCountFun(){
    const [paragraph3, setParagraph3] = useState("");

    try
    {const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    contractLottery = new ethers.Contract(contractAddress, contractABI, signer);
    const mydata = await contractLottery.getItemsCount();
    //alert(mydata);
    setParagraph3(mydata.toString());}
    catch{
      alert("error");
      setParagraph3("error");}

    console.log(contractLottery.target);
    }
    async function enterAuction() {
        const [ itemNum, setItemNun] = useState();

        const [paragraph5, setParagraph5] = useState("");

      try{
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        contractLottery = new ethers.Contract(contractAddress, contractABI, signer);
        const tx = await contractLottery.enter(itemNum, {value: ethers.parseEther("0.0001")});
        console.log(`Transaction sent: ${tx.hash}`);
      
      // Wait for transaction confirmation
        await tx.wait();
        console.log('Transaction confirmed');
        setParagraph5(`New bidder entered the auction`);
  
      }
      catch{
      setParagraph5("error");
      }
    }
    

    async function placeBidFun() {
    const [bidAmount, setBidAmount] = useState('');
    const [paragraph6, setParagraph6] = useState("");
    const [bidItem, setBidItem] = useState();
      try{
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        contractLottery = new ethers.Contract(contractAddress, contractABI, signer);
        const tx = await contractLottery.placeBid(bidItem, {value: ethers.parseEther(bidAmount)});
        console.log(`Transaction sent: ${tx.hash}`);
      
      // Wait for transaction confirmation
        await tx.wait();
        console.log('Transaction confirmed');
        setParagraph6(`successfully paid ${bidAmount}`);
  
      }
      catch (e){
      setParagraph6("error:",e);
      }
    }
    async function paySellerFun() {
      try{
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        contractLottery = new ethers.Contract(contractAddress, contractABI, signer);
        const tx = await contractLottery.paySeller(5);
        console.log(`Transaction sent: ${tx.hash}`);
      
      // Wait for transaction confirmation
        await tx.wait();
        console.log('Transaction confirmed');
        setParagraph6(`successfully paid ${bidAmount}`);
  
      }
      catch (e){
      setParagraph6("error:",e);
      }
    }


    async function winnerPickFun() {
      try{
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        contractLottery = new ethers.Contract(contractAddress, contractABI, signer);
        const tx = await contractLottery.winnerPick(1);
        console.log(`Transaction sent: ${tx.hash}`);
      
      // Wait for transaction confirmation
        await tx.wait();
        console.log('Transaction confirmed');
        setParagraph6(`successfully paid ${bidAmount}`);
  
      }
      catch (e){
      setParagraph6("error:",e);
      }
    }


    async function getWinnerFun(){
      try
      {const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      contractLottery = new ethers.Contract(contractAddress, contractABI, signer);
      const mydata = await contractLottery.getWinner(5);
      //alert(mydata);
      setParagraph3(mydata.toString());}
      catch{
        alert("error");
        setParagraph3("error");}
  
      console.log(contractLottery.target);
      }


      const numOfBiddersFun = async()=> {
        try
        {const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        contractLottery = new ethers.Contract(contractAddress, contractABI, signer);
        const mydata = await contractLottery.numOfBidders(5);
        //alert(mydata);
        setParagraph3(mydata.toString());}
        catch{
          alert("error");
          setParagraph3("error");}
    
        console.log(contractLottery.target);
        }

        const getHighestBidderFun = async()=> {
          try
          {const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          contractLottery = new ethers.Contract(contractAddress, contractABI, signer);
          const mydata = await contractLottery.getHighestBidder(5);
          //alert(mydata);
          setParagraph3(mydata.toString());}
          catch{
            alert("error");
            setParagraph3("error");}
      
          console.log(contractLottery.target);
          }


          const getHighestFun = async()=> {
            try
            {const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            contractLottery = new ethers.Contract(contractAddress, contractABI, signer);
            const mydata = await contractLottery.getHighest(5);
            //alert(mydata);
            setParagraph3(mydata.toString());}
            catch{
              alert("error");
              setParagraph3("error");}
        
            console.log(contractLottery.target);
            }

export default any;
