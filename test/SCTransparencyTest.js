let Kontract = artifacts.require('./SCTransparency.sol');
const InputDataDecoder = require('ethereum-input-data-decoder');
let Web3 = require('web3');
let web3 = new Web3('http://localhost:8545/');

contract('Kontract', function(accounts) {


  it('should get transaction data', async function() {

    let kontract = await Kontract.deployed();
    const decoder = new InputDataDecoder(kontract.abi);
    let transactionAddr = await kontract.addLifecyclePoint('Milch', [null], 'WSB');
    let transaction = await web3.eth.getTransaction(transactionAddr.receipt.transactionHash);
    let inputData = decoder.decodeData(transaction.input);
    assert.equal(inputData.inputs[0],'Milch',"No milk in the Blockchain!");
    assert.equal(inputData.inputs[2],'WSB',"Milk ist not from WSB!");
  });

  it('should get TxID from QR Code', async function () {
    let kontract = await Kontract.deployed();
    kontract.mapQrCodeToTxid(1234567891,0x7d07c0a053eb788e4bee9b61cc207ce2c1b85d879f999454dc9cba0ae6c2cfbd);
    let txid = await kontract.getTxidFromQrCode.call(1234567891);
    let txHash = web3.utils.toHex(txid);
    assert.equal(txHash,0x7d07c0a053eb788e4bee9b61cc207ce2c1b85d879f999454dc9cba0ae6c2cfbd,"Wrong TxID");
  })

  it('should get TxID from QR Code where TxID should be from Product', async function () {
    let kontract = await Kontract.deployed();
    let transactionAddr = await kontract.addLifecyclePoint('Milch', [null], 'WSB');
    kontract.mapQrCodeToTxid(1234567891,transactionAddr.receipt.transactionHash);
    let txid = await kontract.getTxidFromQrCode.call(1234567891);
    let txHash = web3.utils.toHex(txid);
    assert.equal(txHash,transactionAddr.receipt.transactionHash,"Wrong TxID");

    const decoder = new InputDataDecoder(kontract.abi);
    let transaction = await web3.eth.getTransaction(transactionAddr.receipt.transactionHash);
    let inputData = decoder.decodeData(transaction.input);
    assert.equal(inputData.inputs[0],'Milch',"No milk in the Blockchain!");
    assert.equal(inputData.inputs[2],'WSB',"Milk ist not from WSB!");
  })



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
