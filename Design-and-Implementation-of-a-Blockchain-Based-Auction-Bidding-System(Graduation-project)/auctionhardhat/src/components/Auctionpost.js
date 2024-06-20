import { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { contractABI } from "../AddressABI/contractABI";
export const contractAddress = "0xd9048F975eBd33f259116efA42873EfEC88caC1e";

var itemID = 1;

function Auctionpost() {
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [sellerWallet, setSellerWallet] = useState("");
  const [winner] = useState("");


  let contractLottery;


  // useEffect(() => {
  //   getImage();
  // }, []);

  function uploadImage(e) {
    e.preventDefault(); // Prevent default form submission
  
    // Call addItemFun to add the item
    addItemFun().then((result) => {
      // Check if the user rejected paying the gas fees
      if (!result) {
        console.log("User rejected paying gas fees. Item not uploaded.");
        alert("User rejected paying gas fees. Item not uploaded.")
        return; // Exit the function, item not uploaded
      }
      // User accepted paying gas fees, proceed with uploading the item
      fetch("http://localhost:5000/auctionpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // "Access-Control-Allow-Origin": "*", // No need to set this header in the request
        },
        body: JSON.stringify({
          image: image,
          category: category,
          duration: duration,
          sellerWallet: sellerWallet,
          winner: winner,
        }),
      })
        .then((res) => res.json())
        .then((data) => {console.log(data);
        alert("Item has been uploaded.");}
      )
        .catch((error) => console.error("Error uploading image:", error));
    });

  }
  
  

  // function getImage() {
  //   fetch("http://localhost:5000/get-image", {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setAllImage(data); // Update state with fetched image data
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching images:", error);
  //     });
  // }

  function convertToBase64(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error:", error);
    };
  }
  async function addItemFun() {
    try{
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      contractLottery = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await contractLottery.addItem(itemID , sellerWallet);
      console.log(`Transaction sent: ${tx.hash}`);
    
    // Wait for transaction confirmation
      await tx.wait();
      console.log('Transaction confirmed');
      itemID = itemID + 1;
      return true;

    }
    catch{
      console.log('Transaction error');
      return false;

    }
  }

  return (
    <div className="container">
      <style
  dangerouslySetInnerHTML={{
    __html:
      '\n  body {\n    /* margin: 0;\n    padding: 0; */\n    font-family: \'Open Sans\', sans-serif;\n    background: linear-gradient(175deg, #7AB2B2, #FFD0D0);\n    height: 100vh;\n    overflow: hidden;\n}\n\n\n.center {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    width: 400px;\n    background: 4D869C;\n    border-radius: 10px;\n}\n\n.center h1 {\n    text-align: center;\n    padding: 0 0 20px 0;\n    border-bottom: 1px solid silver;\n}\n\n.center form {\n\n    padding: 0 40px;\n    box-sizing: border-box;\n}\n\n.txt_field {\n    position: relative;\n    border-bottom: 2px solid #A0E4CB;\n    margin: 30px 0px;\n}\n\n.txt_field input {\n    width: 100%;\n    padding: 0 5px;\n    height: 30px;\n    font-size: 16px;\n    border: none;\n    background: none;\n    outline: none;\n}\n\n\n.txt_field label {\n    position: absolute;\n    top: 50%;\n    left: 5px;\n    color: #59C1BD;\n    transform: translateY(-50%);\n    font-size: 15px;\n    pointer-events: none;\n    transition: .3s;\n}\n\n\n/*This code targets a form input field with a class of "txt_field" and styles the span element that appears before the input field.\n\nThe first block of code uses the CSS ::before pseudo-element to create an empty content space before the span element. It positions the span element with "position: absolute" and sets the top offset to 30px and the left offset to 0. The span element\'s width is initially set to 0% and height to 2px, and it has a transition effect of 0.3 seconds. The background color of the span element is set to #0D4C92.\n\nThe second block of code targets the label that follows the input field when the input field is either in focus or valid (i.e., has a value). It shifts the label upwards with "top: -5px" and changes its color to #0D4C92, which matches the color of the span element.\n\nTogether, these styles create an effect where the span element grows in width from left to right and changes color when the user types in the input field, and the label moves upwards and changes color as well. This effect provides a visual cue to the user that the input field is active and has a value. */\n\n\n.txt_field span::before {\n    content: \'\';\n    position: absolute;\n    top: 30px;\n    left: 0;\n    width: 0%;\n    height: 2px;\n    transition: .3s;\n    background-color: #0D4C92;\n\n}\n\n.txt_field input:focus~label,\n.txt_field input:valid~label {\n    top: -5px;\n    color: #0D4C92;\n}\n\n\n\n.txt_field input:focus~span::before,\n.txt_field input:valid~span::before {\n    width: 100%;\n}\n\n\n.forgot {\n    margin: -5px 0 20px 5px;\n    color: #59C1BD;\n    cursor: pointer;\n\n}\n\n.forgot:hover {\n    text-decoration: underline;\n    color: #0D4C92;\n}\n\n\ninput[type="submit"] {\n    width: 100%;\n    height: 30px;\n    border: 1px solid;\n    background-color: #59C1BD;\n    border-radius: 25px;\n    font-size: 15px;\n    color: aliceblue;\n    font-weight: 700;\n    cursor: pointer;\n    outline: none;\n}\n\ninput[type="submit"]:hover {\n    background-color: #0D4C92;\n    transition: .3s;\n}\n\n\n.signup_link {\n    margin: 30px 0;\n    text-align: center;\n    font-size: 20px;\n    color: #59C1BD;\n}\n\n.signup_link a{\n    color: #0D4C92;\n    text-decoration: none;\n}\n\n.signup_link a:hover{\n    color: #DC3535;\n} \n    '
  }}
/>
<div className="center">
      <form className = "mb-3" onSubmit={uploadImage}>
        <input
        className="input-group-text"
        color = "white"
          type="file"
          style={{ width: '100%', height: '100%',marginBottom: '10px' }}
          accept="image/*"
          onChange={(e) => convertToBase64(e)}
        />
       
        <input
                className="input-group-text"
                style={{ width: '100%', height: '100%',marginBottom: '10px' }}
          type="number"
          placeholder="Duration (in minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <input
                className="input-group-text"

          type="text"
          placeholder="Wallet Address"
          value={sellerWallet}
          style={{ width: '100%', height: '100%',marginBottom: '10px' }}
          onChange={(e) => setSellerWallet(e.target.value)}
        />
         <select
        className="form-control"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ width: '100%', height: '100%',marginBottom: '10px' }}
        >
          <option value="" style={{ textAlign: 'center' }}>Select Category</option>
          <option value="Phones" style={{ textAlign: 'center' }}>Phones</option>
          <option value="Accessories" style={{ textAlign: 'center' }}>Accessories</option>
          <option value="Laptops" style={{ textAlign: 'center' }}>Laptops</option>
          <option value="Others" style={{ textAlign: 'center' }}>Others</option>
        </select>
        <button className = "btn btn-light"type="submit" style={{ width: '100%', height: '100%' }}>Submit</button>
      </form>
      {image && ( // Display uploaded image if available
        <img

        className="rounded"
        style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          src={image}
          alt="Uploaded"
          
        />
      )}


</div>
    </div>
  );
}

export default Auctionpost;
