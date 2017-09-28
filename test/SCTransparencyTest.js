var Kontract = artifacts.require('./SCTransparency.sol');
const InputDataDecoder = require('ethereum-input-data-decoder');

contract('Kontract', function(accounts) {


  it('should get transaction data', async function() {

    var kontract = await Kontract.deployed();
    const decoder = new InputDataDecoder(kontract.abi);
    var transactionAddr = await kontract.addLifecyclePoint('Milch', [null], 'WSB');
    var Web3 = require('web3');
    var web3 = new Web3('http://localhost:8545/')
    var transaction = await web3.eth.getTransaction(transactionAddr.receipt.transactionHash);
    console.log(transaction);
    var inputData = decoder.decodeData(transaction.input);
    console.log(inputData);
    console.log(inputData.inputs[0]);
  });



  /*
  it('should say hello', async function() {
    var kontract = await Kontract.deployed();
    var result = await kontract.sayHello.call();
    assert.equal(result, "Hello", "It did not say Hello");
  });

  it('should remember how much money I send', async function() {
    let kontract = await Kontract.deployed();
    kontract.sendTransaction({
      value: 100,
      from: accounts[0]
    });
    let balance = await kontract.getBalance.call(accounts[0]);
    assert.equal(balance.valueOf(), 100, 'Wert ist nicht 100');
  });
  */
});
