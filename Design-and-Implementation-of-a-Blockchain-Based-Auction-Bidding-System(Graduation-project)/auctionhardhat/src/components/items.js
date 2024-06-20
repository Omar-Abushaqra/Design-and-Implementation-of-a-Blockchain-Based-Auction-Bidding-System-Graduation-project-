import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { contractABI } from "../AddressABI/contractABI";
export const contractAddress = "0xd9048F975eBd33f259116efA42873EfEC88caC1e";

function Items() {
  const [current, setCurrent] = useState("");
  const [items, setItems] = useState([]);
  const [allImage, setAllImage] = useState([]);
  const [allData, setAllData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (current) {
      getBidders();
    }
  }, [current]);

  useEffect(() => {
    if (allData.length > 0) {
      getImage();
    }
  }, [allData]);

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

  const getBidders = () => {
    fetch("http://localhost:5000/getbidders", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const transformedData = data.map((item) => [
          item.ID,
          item.userbid,
          item.amount,
        ]);
        setItems(transformedData);
       // const filtered = transformedData.filter((item) => item[1] === current);
        setAllData(transformedData);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  };

  const getImage = () => {
    fetch("http://localhost:5000/get-image", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const itemIDList = allData.map((item) => item[0]);

        const filteredData = data.filter((item) =>
          itemIDList.includes(item.itemID) 
        );

        const transformedData = filteredData.map((item) => [
          item.itemID, // 0
          item.image, // 1
          item.category, // 2
          item.endTime, // 3
          item.sellerWallet, // 4
          item.winner, // 5
        ]);

        setAllImage(transformedData);
      })
      .catch((error) => {
        console.error("Error fetching Data:", error);
      });
  };

  const payAuction = async (item) => {
    if (calculateRemainingTime(item[3]) > 0) {
      alert("Wait for the auction to end");
      return;
    }
    const filteredData = allData.filter((data) => item.includes(item[0]));

    let winner = "";
      let max = "-1";
      filteredData.forEach((data) => {
        if (data[2] > max) {
          winner = data[1];
          max = data[2];
        }
      });
    if (winner !== current) {
      alert(
        "You are not the winner, check your wallet maybe you are the lucky one"
      );
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

      const tx = await contractLottery.placeBid(item[0], {
        value: ethers.parseEther(max),
      });
      console.log(`Transaction sent: ${tx.hash}`);

      // Wait for transaction confirmation
      await tx.wait();
      console.log("Transaction confirmed");

      alert("Congratulations!!!");
    } catch (e) {
      alert(e);
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

  const getWinner = (item) => {
    if (calculateRemainingTime(item[3]) > 0) {
      return "waiting for the winner";
    } else {
      const filteredData = allData.filter((data) => item.includes(item[0]));

      let winner = "";
      let max = "-1";
      filteredData.forEach((data) => {
        if (data[2] > max) {
          winner = data[1];
          max = data[2];
        }
      });

      return `${winner} won the item`;
    }
  };

  return (
    <div className="container">
      <style
   dangerouslySetInnerHTML={{
    __html:
      '\n  body {\n    /* margin: 0;\n    padding: 0; */\n    font-family: \'Open Sans\', sans-serif;\n    background: linear-gradient(175deg, #7AB2B2, #FFD0D0);\n    height: 100vh;\n    overflow: hidden;\n}\n\n\n.center {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    width: 1000px;\n    background: 4D869C;\n    border-radius: 10px;\n}\n\n.center h1 {\n    text-align: center;\n    padding: 0 0 20px 0;\n    border-bottom: 1px solid silver;\n}\n\n.center form {\n\n    padding: 0 40px;\n    box-sizing: border-box;\n}\n\n.txt_field {\n    position: relative;\n    border-bottom: 2px solid #A0E4CB;\n    margin: 30px 0px;\n}\n\n.txt_field input {\n    width: 100%;\n    padding: 0 5px;\n    height: 30px;\n    font-size: 16px;\n    border: none;\n    background: none;\n    outline: none;\n}\n\n\n.txt_field label {\n    position: absolute;\n    top: 50%;\n    left: 5px;\n    color: #59C1BD;\n    transform: translateY(-50%);\n    font-size: 15px;\n    pointer-events: none;\n    transition: .3s;\n}\n\n\n/*This code targets a form input field with a class of "txt_field" and styles the span element that appears before the input field.\n\nThe first block of code uses the CSS ::before pseudo-element to create an empty content space before the span element. It positions the span element with "position: absolute" and sets the top offset to 30px and the left offset to 0. The span element\'s width is initially set to 0% and height to 2px, and it has a transition effect of 0.3 seconds. The background color of the span element is set to #0D4C92.\n\nThe second block of code targets the label that follows the input field when the input field is either in focus or valid (i.e., has a value). It shifts the label upwards with "top: -5px" and changes its color to #0D4C92, which matches the color of the span element.\n\nTogether, these styles create an effect where the span element grows in width from left to right and changes color when the user types in the input field, and the label moves upwards and changes color as well. This effect provides a visual cue to the user that the input field is active and has a value. */\n\n\n.txt_field span::before {\n    content: \'\';\n    position: absolute;\n    top: 30px;\n    left: 0;\n    width: 0%;\n    height: 2px;\n    transition: .3s;\n    background-color: #0D4C92;\n\n}\n\n.txt_field input:focus~label,\n.txt_field input:valid~label {\n    top: -5px;\n    color: #0D4C92;\n}\n\n\n\n.txt_field input:focus~span::before,\n.txt_field input:valid~span::before {\n    width: 100%;\n}\n\n\n.forgot {\n    margin: -5px 0 20px 5px;\n    color: #59C1BD;\n    cursor: pointer;\n\n}\n\n.forgot:hover {\n    text-decoration: underline;\n    color: #0D4C92;\n}\n\n\ninput[type="submit"] {\n    width: 100%;\n    height: 30px;\n    border: 1px solid;\n    background-color: #59C1BD;\n    border-radius: 25px;\n    font-size: 15px;\n    color: aliceblue;\n    font-weight: 700;\n    cursor: pointer;\n    outline: none;\n}\n\ninput[type="submit"]:hover {\n    background-color: #0D4C92;\n    transition: .3s;\n}\n\n\n.signup_link {\n    margin: 30px 0;\n    text-align: center;\n    font-size: 20px;\n    color: #59C1BD;\n}\n\n.signup_link a{\n    color: #0D4C92;\n    text-decoration: none;\n}\n\n.signup_link a:hover{\n    color: #DC3535;\n} \n    '
  }}
/>

      <div className="center">
        <h1>Your shopping list</h1>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {allImage.map((data, index) => (
            <li key={index} style={{ padding: "20px" }}>
              <div style={{ width: "300px", marginTop: "auto" }}>
                <img
                  className="rounded"
                  src={data[1]}
                  alt="Image"
                  style={{
                    width: "300px",
                    height: "250px",
                    display: "block",
                    margin: "0 auto",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    marginTop: "10px",
                    width: "300px",
                  }}
                >
                  <p>{getWinner(data)}</p>
                  <p>{displayRemainingTime(data[3])}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "300px",
                  }}
                ></div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                    width: "300px",
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => payAuction(data)}
                    style={{ flexGrow: 1, marginLeft: 5 }}
                  >
                    Pay
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Items;
