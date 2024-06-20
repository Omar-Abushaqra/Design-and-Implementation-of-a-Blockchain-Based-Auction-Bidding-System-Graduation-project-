// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Auction {
    uint public highestBid;
    uint public highestBid2;
    uint public auctionEndTime;
    mapping(address => uint) public bids;
    address public seller;
    address public highestBidder;
    address public highestBidder2;
    address[] public bidders;
    uint private entryfees=1 ether;

    constructor(uint _durationMinutes,address _seller) {
        seller = _seller;
        auctionEndTime = block.timestamp + _durationMinutes * 1 minutes;
    }
    
       function enter(address user , uint value) public  {//receive etherum from the bidders
        require(value >= entryfees, "Entry fee is required");
        //enters to the array the address of the bidder currently interacting with the smart contract(msg.sender)
        bidders.push(user); 
        // payable(address(this)).transfer(msg.value);
    }
    
    
    
    function placeBid(address user ,  uint value) external   {
    require(block.timestamp < auctionEndTime, "Auction already ended");
    require(value > highestBid , "Bid amount must be higher than the current highest bid");
    bool validUser=false;
    for (uint i = 0; i < bidders.length; i++) {
        validUser=false || validUser;
        if (bidders[i] == user) {
            validUser=true;
            highestBidder2 = highestBidder;
            highestBid2 = highestBid;
            highestBidder = user;
            highestBid = value;
            break; // Once the bid is placed by the sender, exit the loop
        }
}
   require(validUser,"You need to pay the entry fees first");
  }
function endAuction(address user) external {
        require(user == seller, "Only the owner can call this function");
        require(block.timestamp >= auctionEndTime, "Auction not yet ended");
        bool success;
        (success, ) = payable(seller).call{value: highestBid}("");// Transfer the winning amount to the owner
        require(!success, "Payment succeed");
        bool success2;
        (success2, ) = payable(seller).call{value: highestBid2}("");// Transfer the 2nd  winning amount to the owner
        require(success2, "Second Payment Failed");

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
    function getBidders() external view returns (address[] memory) {
        return bidders;
    }

function getHighestBidder() external view returns (address) {
        return highestBidder;
    }
    function getHighest() external view returns (uint) {
        return highestBid;
    }
    function getHighest2() external view returns (uint) {
        return highestBid2;
    }
}