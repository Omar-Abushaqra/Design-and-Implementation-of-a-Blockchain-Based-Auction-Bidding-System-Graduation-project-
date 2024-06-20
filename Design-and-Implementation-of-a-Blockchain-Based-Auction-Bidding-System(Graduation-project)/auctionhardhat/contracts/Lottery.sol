// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
contract Lottery {
  address winner;
   function winnerpick(address[] memory bidders) public payable  {
        //the value should bechanged based on our website fees   
        require(bidders.length > 0, "No bidders on this product");
        //to make sure random num to fall within the range [0, bidders.length)
        uint index = random(block.timestamp, bidders) % bidders.length;
        // calculate the amount to transfer (half of the sent money)
        uint amount = address(this).balance / 3;
        // Transfer half of the sent money to the winner
        winner = bidders[index];
        payable(bidders[index]).transfer(amount);
    }

    function random(uint seed , address[] memory bidders) private pure returns (uint) {
    return uint(keccak256(abi.encodePacked(seed, bidders.length)));
}
    function getWinner() external view returns (address) {
    return winner;
    }
}