const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("LotteryModule", (m) => {

  const lotteryContract = m.contract("Lottery", []);

  return { lotteryContract };
});