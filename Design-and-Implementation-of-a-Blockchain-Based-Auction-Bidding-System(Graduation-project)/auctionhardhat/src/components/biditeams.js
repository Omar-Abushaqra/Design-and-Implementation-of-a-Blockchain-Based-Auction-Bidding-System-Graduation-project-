import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { contractABI } from "../AddressABI/contractABI";
import Items from "./items";

export const contractAddress = "0xd9048F975eBd33f259116efA42873EfEC88caC1e";

function Biditeams() {
  const [ethereumPrice, setEthereumPrice] = useState();
  const [allImage, setAllImage] = useState([]);
  const [current, setCurrent] = useState("");
  const [bidValue, setBidValue] =  useState(0);
  const bidders = {};
  const highestBidder={};
  const [formData, setFormData] = useState({
    itemID: '',
    userbid: '',
    amount: ''
  });
  const navigate = useNavigate();
  useEffect(() => {
    getImage();
    getCurrentUser();
    const intervalId = setInterval(() => {
      fetchEthereumPrice();
      updateRemainingTimes();
          }, 1000); // 60000 milliseconds = 1 minute
    return () => clearInterval(intervalId);  }, []);

    const updateRemainingTimes = () => {
      setAllImage(prevImages =>
        prevImages.map(image => {
          if (image.remainingTime > 0) {
            return { ...image, remainingTime: image.remainingTime - 1 };
          }
          return image;
        })
      );
    };
const ETH_USD_AGGREGATOR_ADDRESS = "0x694AA1769357215DE4FAC081bf1f309aDC325306";
  const AggregatorV3Interface = [
    {
      "inputs": [],
      "name": "latestRoundData",
      "outputs": [
        { "internalType": "uint80", "name": "roundId", "type": "uint80" },
        { "internalType": "int256", "name": "answer", "type": "int256" },
        { "internalType": "uint256", "name": "startedAt", "type": "uint256" },
        { "internalType": "uint256", "name": "updatedAt", "type": "uint256" },
        { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  const fetchEthereumPrice = async () => {
    try {
      const provider = new ethers.InfuraProvider("sepolia");
      const aggregator = new ethers.Contract(
        ETH_USD_AGGREGATOR_ADDRESS,
        AggregatorV3Interface,
        provider
      );
      const priceData = await aggregator.latestRoundData();
      const price = parseFloat(ethers.formatUnits(priceData.answer, 8));
      setEthereumPrice(price.toFixed(2));
    } catch (error) {
      console.error("Error fetching ETH/USD price:", error);
      setEthereumPrice(null);
    }
  };
  const getImage = () => {
    fetch("http://localhost:5000/get-image", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const transformedData = data.map((item) => [
            item.itemID, // 0
            item.image, //1
            item.category, // 2
            item.endTime,// 3
            item.sellerWallet,// 4
            item.winner, // 5
            [],
          ]
             );
        setAllImage(transformedData);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  };

  const getCurrentUser = () => {
    axios
      .get("http://localhost:5000/username")
      .then((res) => {
        if (res.data.valid) {
          setCurrent(res.data.username);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  const enterAuction = async (data) => {
    
    if(calculateRemainingTime(data[3]) <= 0)      {
        alert("Auction ended");
        return;
      }
        try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractLottery = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const tx = await contractLottery.enter(data[0], {
          value: ethers.parseEther("0.0001"),
        });

        console.log(`Transaction sent: ${tx.hash}`);

        // Wait for transaction confirmation
        await tx.wait();
        console.log("Transaction confirmed");
        data[6].push({
          name: current,
          amount: 0
        });

        //bidders[`${itemID}`]={"item":itemID,"name":current,"amount":0};

        alert(`${current} has entered the Auction`);
        // Add bidder to state
        // addBidder(current,true,0,itemID);
      }
       catch (error) {
        console.error("Error entering auction:", error);
      }
  };

  const bidAuction = async (item) => {
    
         if(calculateRemainingTime(item[3]) <= 0)
      {
        alert("Auction ended");
        return;
      }
      var validUser = false;
      
        if (item[6].filter(i => i.name === current).length > 0) {
          validUser = true;
        }
      
      if(!validUser){
        alert("enter the Auction first");
        return;
      }
    //const foundBidder = bidders.find(bidder => bidder[0] === current && bidder[3] === item[0]);

    if (true) { 
      // try{
      //   const provider = new ethers.BrowserProvider(window.ethereum);
      //   const signer = await provider.getSigner();
      //   const contractLottery = new ethers.Contract(
      //     contractAddress,
      //     contractABI,
      //     signer
      //   );  
      //   //const gasEstimate = await contractLottery.estimateGas.placeBid(item[0], { value: ethers.parseEther(bidAmount[index]) });

      //   const tx = await contractLottery.placeBid(item[0], {value: ethers.parseEther(bidValue.toString())});
      //   console.log(`Transaction sent: ${tx.hash}`);
      
      // // Wait for transaction confirmation
      //   await tx.wait();
      //   console.log('Transaction confirmed');
      const currentIndex = item[6].findIndex((data) => data.name === current);

  if (currentIndex !== -1) {
    item[6][currentIndex].amount = bidValue;
    fetch("http://localhost:5000/imagebidders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // "Access-Control-Allow-Origin": "*", // No need to set this header in the request
        },
        body: JSON.stringify({
          ID: item[0],
          userbid: current,
          amount: bidValue,
        }),
      })
        .then((res) => res.json())
        .then((data) => {console.log(data);
          alert(`${current } paid ${bidValue } on item #${item[0]}`);
        }
      )
        .catch((error) => console.error("Error uploading image:", error));
  }

       
        
      }
    //   catch (e){
    //     alert(e);
    //   }
    // }
     else {
      // If no bidder with the desired username is found
    alert("Enter the auction first");
    }
    
  };
  const calculateRemainingTime = (endTime) => {
    const end = new Date(endTime);
    const now = new Date();
    const difference = end - now;
    return difference;
  };
  const displayRemainingTime = (endTime) => {
    const end = new Date(endTime);
    const now = new Date();
    const difference = end - now;

    if (difference <= 0) return "Auction ended";

    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

 
  const currentItems = allImage.filter(item => item[6].some(subItem => subItem.name === current));

  

  return (
    

    <div className="container">
    <Link to='/items' state={currentItems} style={{fontSize: "18px", position:"absolute", display:"flex",justifyContent: "flex-end" }}>shopping list</Link>

<style
   dangerouslySetInnerHTML={{
    __html:
      '\n  body {\n    /* margin: 0;\n    padding: 0; */\n    font-family: \'Open Sans\', sans-serif;\n    background: linear-gradient(175deg, #7AB2B2, #FFD0D0);\n    height: 100vh;\n    overflow: hidden;\n}\n\n\n.center {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    width: 1000px;\n    background: 4D869C;\n    border-radius: 10px;\n}\n\n.center h1 {\n    text-align: center;\n    padding: 0 0 20px 0;\n    border-bottom: 1px solid silver;\n}\n\n.center form {\n\n    padding: 0 40px;\n    box-sizing: border-box;\n}\n\n.txt_field {\n    position: relative;\n    border-bottom: 2px solid #A0E4CB;\n    margin: 30px 0px;\n}\n\n.txt_field input {\n    width: 100%;\n    padding: 0 5px;\n    height: 30px;\n    font-size: 16px;\n    border: none;\n    background: none;\n    outline: none;\n}\n\n\n.txt_field label {\n    position: absolute;\n    top: 50%;\n    left: 5px;\n    color: #59C1BD;\n    transform: translateY(-50%);\n    font-size: 15px;\n    pointer-events: none;\n    transition: .3s;\n}\n\n\n/*This code targets a form input field with a class of "txt_field" and styles the span element that appears before the input field.\n\nThe first block of code uses the CSS ::before pseudo-element to create an empty content space before the span element. It positions the span element with "position: absolute" and sets the top offset to 30px and the left offset to 0. The span element\'s width is initially set to 0% and height to 2px, and it has a transition effect of 0.3 seconds. The background color of the span element is set to #0D4C92.\n\nThe second block of code targets the label that follows the input field when the input field is either in focus or valid (i.e., has a value). It shifts the label upwards with "top: -5px" and changes its color to #0D4C92, which matches the color of the span element.\n\nTogether, these styles create an effect where the span element grows in width from left to right and changes color when the user types in the input field, and the label moves upwards and changes color as well. This effect provides a visual cue to the user that the input field is active and has a value. */\n\n\n.txt_field span::before {\n    content: \'\';\n    position: absolute;\n    top: 30px;\n    left: 0;\n    width: 0%;\n    height: 2px;\n    transition: .3s;\n    background-color: #0D4C92;\n\n}\n\n.txt_field input:focus~label,\n.txt_field input:valid~label {\n    top: -5px;\n    color: #0D4C92;\n}\n\n\n\n.txt_field input:focus~span::before,\n.txt_field input:valid~span::before {\n    width: 100%;\n}\n\n\n.forgot {\n    margin: -5px 0 20px 5px;\n    color: #59C1BD;\n    cursor: pointer;\n\n}\n\n.forgot:hover {\n    text-decoration: underline;\n    color: #0D4C92;\n}\n\n\ninput[type="submit"] {\n    width: 100%;\n    height: 30px;\n    border: 1px solid;\n    background-color: #59C1BD;\n    border-radius: 25px;\n    font-size: 15px;\n    color: aliceblue;\n    font-weight: 700;\n    cursor: pointer;\n    outline: none;\n}\n\ninput[type="submit"]:hover {\n    background-color: #0D4C92;\n    transition: .3s;\n}\n\n\n.signup_link {\n    margin: 30px 0;\n    text-align: center;\n    font-size: 20px;\n    color: #59C1BD;\n}\n\n.signup_link a{\n    color: #0D4C92;\n    text-decoration: none;\n}\n\n.signup_link a:hover{\n    color: #DC3535;\n} \n    '
  }}
/>
<br></br>
<h1>
  <p style={{ textAlign: "center" }}>
    Ethereum Price :
    {ethereumPrice ? `USD ${ethereumPrice}` : "Loading..."}

  </p>
  </h1>
  <br></br>
<div className="center" style={{ height: "500px", width: "1500px", overflowY: "auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
  
<br></br>
  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
    {allImage.map((data, index) => (
      <li key={index} style={{ padding: "20px" }}>
        <div  style={{ width: "300px", marginTop: "auto" }}>
          <img
           className="rounded"
            src={data[1]}
            alt="Image"
            style={{ width: "300px", height: "250px", display: "block", margin: "0 auto" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "12px",
              marginTop: "10px",
              width: "300px"
            }}
          >
            <p>Category: {data[2]}</p>
            <p>{displayRemainingTime(data[3])}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", width: "300px" }}>
  <input
    className="input-group-text"
    type="number"
    onChange={(e) => setBidValue(e.target.value)}
    placeholder="Enter bid value"
    style={{ flexGrow: 1 , height : "35px"}}
  />
</div>
<div style={{ display: "flex", alignItems: "center", marginTop: "10px", width: "300px", justifyContent: "space-between" }}>
  <button className="btn btn-secondary btn-sm" onClick={() => enterAuction(data)} style={{ flexGrow: 1 , marginRight : 5}}>Enter Auction</button>
  <button className="btn btn-secondary btn-sm" onClick={() => bidAuction(data)} style={{ flexGrow: 1 ,marginLeft : 5 }}>Bid on Auction</button>
</div>
        </div>
      </li>
    ))}
  </ul>
</div>  
  </div>

  );
}
export default Biditeams;

