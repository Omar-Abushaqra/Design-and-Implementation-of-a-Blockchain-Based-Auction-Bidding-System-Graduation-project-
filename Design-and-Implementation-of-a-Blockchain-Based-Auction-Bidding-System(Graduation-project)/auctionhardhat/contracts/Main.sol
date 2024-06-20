// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;


contract Main {
    address payable winner;
    uint public highestBid;
    uint public highestBid2;
    uint public auctionEndTime;
    mapping(address => uint) public bids;
    address public seller;
    address public highestBidder;
    address public highestBidder2;
    address[]  public bidders;
    uint private entryfees=1 ether;

    constructor(uint _auctionDurationMinutes) {
        seller = msg.sender;
        auctionEndTime = block.timestamp + _auctionDurationMinutes * 1 minutes;
    }

    function enterAuction() public payable {
         require(msg.value >= entryfees, "Entry fee is required");
        //enters to the array the address of the bidder currently interacting with the smart contract(msg.sender)
         bidders.push(msg.sender); 
        // payable(address(this)).transfer(msg.value);
    }

    function placeBid() external payable {
    require(this.timeRemaining()> 0, "Auction already ended");
    require(msg.value > highestBid , "Bid amount must be higher than the current highest bid");
    bool validUser=false;
    for (uint i = 0; i < bidders.length; i++) {
        validUser=false || validUser;
        if (bidders[i] == msg.sender) {
            validUser=true;
            highestBidder2 = highestBidder;
            highestBid2 = highestBid;
            highestBidder = msg.sender;
            highestBid = msg.value;
            break; // Once the bid is placed by the sender, exit the loop
        }
}
   require(validUser,"You need to pay the entry fees first");
}

    function endAuction() external payable {
        if(this.timeRemaining()<= 0){
        require(msg.sender == seller, "Only the owner can call this function");
        require(block.timestamp >= auctionEndTime, "Auction not yet ended");
        bool success;
        (success, ) = payable(seller).call{value: highestBid}("");// Transfer the winning amount to the owner
        require(!success, "Payment succeed");
        bool success2;
        (success2, ) = payable(seller).call{value: highestBid2}("");// Transfer the 2nd  winning amount to the owner
        require(success2, "Second Payment Failed");
//the value should bechanged based on our website fees   
       
        }
           }

    function winnerpick() public payable  {
        if(this.timeRemaining()<= 0){
        //the value should bechanged based on our website fees   
        require(bidders.length > 0, "No bidders on this product");
        //to make sure random num to fall within the range [0, bidders.length)
        uint index = random(block.timestamp) % bidders.length;
        // calculate the amount to transfer (half of the sent money)
        uint amount = address(this).balance / 3;
        // Transfer half of the sent money to the winner
        winner = payable (bidders[index]);
        winner.transfer(amount);
    }
    }

    function random(uint seed ) private view returns (uint) {
        uint256 length=bidders.length;
    return uint(keccak256(abi.encodePacked(seed, length)));
    }

    function timeRemaining() external view returns (uint256) {
        if (block.timestamp < auctionEndTime) {
        uint sec=(auctionEndTime - block.timestamp);
        // uint min=(auctionEndTime - block.timestamp)/60;
            return sec;
        } else {
            return 0;
        }
    }   

}