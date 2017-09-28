var SCTransparency = artifacts.require("./SCTransparency.sol");

module.exports = async function(callback) {
  var kontract = await SCTransparency.deployed();
  console.log(kontract);
  var transactionAddr = await kontract.addLifecyclePoint('Milch', [null], 'WSB');
  console.log("-------------");
  console.log(transactionAddr);
  callback();
}
;
