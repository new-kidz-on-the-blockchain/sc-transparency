let Kontract = artifacts.require('./SCTransparency.sol');
const InputDataDecoder = require('ethereum-input-data-decoder');
let Web3 = require('web3');
let web3 = new Web3('http://localhost:8545/');

contract('Kontract', function(accounts) {


  it('should get transaction data', async function() {
      let kontract = await Kontract.deployed();
      const decoder = new InputDataDecoder(kontract.abi);
      let transactionAddr = await kontract.addLifecyclePoint('Milch', [], 'WSB', {from: accounts[0]});

      let id = extractId(transactionAddr);
      
      let origin = await kontract.getOrigin.call(id); 
      console.log(origin);
      assert.equal(await kontract.getProductName.call(id),'Milch',"No milk in the Blockchain!");
      assert.equal(await kontract.getLocation.call(id),   'WSB',"Milk ist not from WSB!");
      assert.deepEqual(origin,[],"origin is fishy");
  });

  it('should get TxID from QR Code', async function () {
    let kontract = await Kontract.deployed();
    kontract.mapQrCodeToTxid(1234567891,0x7d07c0a053eb788e4bee9b61cc207ce2c1b85d879f999454dc9cba0ae6c2cfbd);
    let txid = await kontract.getTxidFromQrCode.call(1234567891);
    let txHash = web3.utils.toHex(txid);
    assert.equal(txHash,0x7d07c0a053eb788e4bee9b61cc207ce2c1b85d879f999454dc9cba0ae6c2cfbd,"Wrong TxID");
  });

  it('should get TxID from QR Code where TxID should be from Product', async function () {
    let kontract = await Kontract.deployed();
    let transactionAddr = await kontract.addLifecyclePoint('Milch', [], 'WSB');
    let id = extractId(transactionAddr);
    kontract.mapQrCodeToTxid(1234567891,id);
    let txid = await kontract.getTxidFromQrCode.call(1234567891);
    assert.deepEqual(txid,id,"Wrong TxID");

    assert.equal(await kontract.getProductName.call(id),'Milch',"No milk in the Blockchain!");
    assert.equal(await kontract.getLocation.call(id),   'WSB',"Milk ist not from WSB!");
  });



});

function extractId(transactionAddr){
      for (var i = 0; i < transactionAddr.logs.length; i++){
	  var log = transactionAddr.logs[i];
	  if (log.event == "Id"){
	      return log.args.id;
	  }
	  
      }
}
