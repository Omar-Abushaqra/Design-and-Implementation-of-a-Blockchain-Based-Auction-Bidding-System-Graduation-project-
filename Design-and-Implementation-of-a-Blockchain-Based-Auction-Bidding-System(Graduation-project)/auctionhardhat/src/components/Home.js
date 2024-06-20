
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

function Home() {


    const [name, setName] = useState('');
    const navigate = useNavigate();
    axios.defaults.withCredentials=true;


     useEffect(() => {
        axios.get('http://localhost:5000/username')
            .then(res => {
                if (res.data.valid) {
                    setName(res.data.username);
                } else {
                    navigate('/login');
                }
            })
            .catch(err => console.log(err));
    }, []); 



 
 
    return (
        <div className="container">

<style
  dangerouslySetInnerHTML={{
    __html:
      '\n  body {\n    /* margin: 0;\n    padding: 0; */\n    font-family: \'Open Sans\', sans-serif;\n    background: linear-gradient(175deg, #7AB2B2, #FFD0D0);\n    height: 100vh;\n    overflow: hidden;\n}\n\n\n.center {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    width: 400px;\n    background: white;\n    border-radius: 10px;\n}\n\n.center h1 {\n    text-align: center;\n    padding: 0 0 20px 0;\n    border-bottom: 1px solid silver;\n}\n\n.center form {\n\n    padding: 0 40px;\n    box-sizing: border-box;\n}\n\n.txt_field {\n    position: relative;\n    border-bottom: 2px solid #A0E4CB;\n    margin: 30px 0px;\n}\n\n.txt_field input {\n    width: 100%;\n    padding: 0 5px;\n    height: 30px;\n    font-size: 16px;\n    border: none;\n    background: none;\n    outline: none;\n}\n\n\n.txt_field label {\n    position: absolute;\n    top: 50%;\n    left: 5px;\n    color: #59C1BD;\n    transform: translateY(-50%);\n    font-size: 15px;\n    pointer-events: none;\n    transition: .3s;\n}\n\n\n/*This code targets a form input field with a class of "txt_field" and styles the span element that appears before the input field.\n\nThe first block of code uses the CSS ::before pseudo-element to create an empty content space before the span element. It positions the span element with "position: absolute" and sets the top offset to 30px and the left offset to 0. The span element\'s width is initially set to 0% and height to 2px, and it has a transition effect of 0.3 seconds. The background color of the span element is set to #0D4C92.\n\nThe second block of code targets the label that follows the input field when the input field is either in focus or valid (i.e., has a value). It shifts the label upwards with "top: -5px" and changes its color to #0D4C92, which matches the color of the span element.\n\nTogether, these styles create an effect where the span element grows in width from left to right and changes color when the user types in the input field, and the label moves upwards and changes color as well. This effect provides a visual cue to the user that the input field is active and has a value. */\n\n\n.txt_field span::before {\n    content: \'\';\n    position: absolute;\n    top: 30px;\n    left: 0;\n    width: 0%;\n    height: 2px;\n    transition: .3s;\n    background-color: #0D4C92;\n\n}\n\n.txt_field input:focus~label,\n.txt_field input:valid~label {\n    top: -5px;\n    color: #0D4C92;\n}\n\n\n\n.txt_field input:focus~span::before,\n.txt_field input:valid~span::before {\n    width: 100%;\n}\n\n\n.forgot {\n    margin: -5px 0 20px 5px;\n    color: #59C1BD;\n    cursor: pointer;\n\n}\n\n.forgot:hover {\n    text-decoration: underline;\n    color: #0D4C92;\n}\n\n\ninput[type="submit"] {\n    width: 100%;\n    height: 30px;\n    border: 1px solid;\n    background-color: #59C1BD;\n    border-radius: 25px;\n    font-size: 15px;\n    color: aliceblue;\n    font-weight: 700;\n    cursor: pointer;\n    outline: none;\n}\n\ninput[type="submit"]:hover {\n    background-color: #0D4C92;\n    transition: .3s;\n}\n\n\n.signup_link {\n    margin: 30px 0;\n    text-align: center;\n    font-size: 20px;\n    color: #59C1BD;\n}\n\n.signup_link a{\n    color: #0D4C92;\n    text-decoration: none;\n}\n\n.signup_link a:hover{\n    color: #DC3535;\n} \n    '
  }}
/>
     <br></br>
            <div><h1 style={{fontSize :"30px" , color: "#4D869C"}}>Welcome {name}</h1></div>

 

            <div className="center">
            <h1 style={{color: "#4D869C"}}>BIDMONSTER</h1>

                <button className="button btn btn-link" type="submit" herf ="/auctionpost" > 
                <Link   className="link" to="/auctionpost">Post an Auction</Link>
                </button>
<br></br>
                <button className="button btn btn-link" type="submit" herf ="/biditems"> 
                <Link className="link" to="/biditeams">Bid on Items</Link> {/* Update link to biditeams */}
                </button>
<br></br>
              
     

                <button className="button btn btn-link" type="submit" herf ="/items"> 
                <Link className="link" to="/admin">Admin Page</Link> {/* Update this line */}
                </button>

                <div className="link-space"></div> {/* Space */}
                <div className="link-space"></div> {/* Space */}
            </div>
        </div>
    );
}

export default Home;

