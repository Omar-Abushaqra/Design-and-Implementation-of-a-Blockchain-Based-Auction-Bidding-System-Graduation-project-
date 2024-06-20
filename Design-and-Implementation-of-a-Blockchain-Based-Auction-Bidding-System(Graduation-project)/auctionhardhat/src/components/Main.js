import React, {useState} from 'react';
import { ethers } from "ethers";
import { contractABI } from "../AddressABI/contractABI";

// Note: Don't import contractAddress here, as it's exported from another file
export const contractAddress = "0xd9048F975eBd33f259116efA42873EfEC88caC1e";
var itemNumber = 1;
function Main() {
  const { ethereum } = window;
  const [sellerAddress, setSellerAddress] = useState('');
  const [ itemNum, setItemNun] = useState();

  const [paragraph1, setParagraph1] = useState("");
  const [paragraph2, setParagraph2] = useState(""); 
  const [paragraph3, setParagraph3] = useState("");
  const [paragraph4, setParagraph4] = useState("");
  const [paragraph5, setParagraph5] = useState("");



  const connectMetamask = async () => {
    if(window.ethereum !== "undefined") {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log(accounts[0]);
      setParagraph1(accounts[0]);
    }
  }

  let contractLottery;

  const printFun = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    contractLottery = new ethers.Contract(contractAddress, contractABI, signer);
    const myData = await contractLottery.add(5);
    setParagraph2(myData.toString());
    //bonus:
    console.log(contractLottery.target);
  }


  async function addItemFun() {
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
  const ItemCountFun = async()=> {
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
    const [bidAmount, setBidAmount] = useState('');
    const [paragraph6, setParagraph6] = useState("");
    const [bidItem, setBidItem] = useState();

    async function placeBidFun() {
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


    const getWinnerFun = async()=> {
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

        







    return (
      <div>
        <button onClick={connectMetamask}>Connect Metamask</button>
        <p>{paragraph1}</p>
        
        <button onClick={printFun}>print</button>
        <p>{paragraph2}</p>
        <input
          type="text"
          value={sellerAddress}
          onChange={(e) => setSellerAddress(e.target.value)}
          placeholder="Seller Address"
        />
        <button onClick={addItemFun}>Add Item</button>
        <p>{paragraph4}</p>
        
        <button onClick={ItemCountFun}>Item Count</button>
        <p>{paragraph3}</p>
        <input
          type="text"
          value={itemNum}
          onChange={(e) => setItemNun(e.target.value)}
          placeholder="Item Number"
        />
        <button onClick={enterAuction}>enter Auction</button>
        <p>{paragraph5}</p>
        <input
        type="text"
        value={bidItem}
        onChange={(e) => setBidItem(e.target.value)}
        placeholder="Item"
      />
        <input
        type="text"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        placeholder="Bid Amount (in ETH)"
      />
      <button onClick={placeBidFun}>Place Bid</button>
      <p>{paragraph6}</p>
      
      </div>
      
    );
  };

export default Main;
