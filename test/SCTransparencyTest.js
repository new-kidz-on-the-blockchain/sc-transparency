let Kontract = artifacts.require('./SCTransparency.sol');
const InputDataDecoder = require('ethereum-input-data-decoder');
let Web3 = require('web3');
let web3 = new Web3('http://localhost:8545/');
let kontract;

contract('Kontract', function(accounts) {


  it('should get transaction data', async function() {
      kontract = await Kontract.deployed();
      await kontract.addSupplier(accounts[1], 'Coca Cola');
      sName = await kontract.suppliers.call(accounts[1]);
      assert.equal(sName, 'Coca Cola', 'No supplier added');

      let transactionAddr = await kontract.addLifecyclePoint('Milch', [], 'WSB', {from: accounts[1]});
      let id = extractId(transactionAddr);

      let origin = await kontract.getOrigin.call(id);
      assert.equal(await kontract.getProductName.call(id),'Milch',"No milk in the Blockchain!");
    assert.deepEqual(origin,[],"origin is fishy");
    assert.equal(await kontract.getLocation.call(id),   'WSB',"Milk ist not from WSB!");
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
    await kontract.addSupplier(accounts[1], 'Coca Cola');
    sName = await kontract.suppliers.call(accounts[1]);
    assert.equal(sName, 'Coca Cola', 'No supplier added');
    let transactionAddr = await kontract.addLifecyclePoint('Milch', [], 'WSB', {from: accounts[1]});
    let id = extractId(transactionAddr);
    kontract.mapQrCodeToTxid(1234567891,id);
    let txid = await kontract.getTxidFromQrCode.call(1234567891);
    assert.deepEqual(txid,id,"Wrong TxID");

    assert.equal(await kontract.getProductName.call(id),'Milch',"No milk in the Blockchain!");
    assert.equal(await kontract.getLocation.call(id),   'WSB',"Milk ist not from WSB!");
  });



  it('should check supplier added', async function () {
    let kontract = await Kontract.deployed();
    await kontract.addSupplier(0x7d07c0a053eb788e4bee9b61cc207ce2c1b85d879f999454dc9cba0ae6c2cfbd, 'Nestle');
    let sName = await kontract.suppliers.call(0x7d07c0a053eb788e4bee9b61cc207ce2c1b85d879f999454dc9cba0ae6c2cfbd);
    assert.equal(sName, 'Nestle', 'No supplier added');
  })



  it('should throw error for not owner', async function () {
    let kontract = await Kontract.deployed();
    await kontract.addSupplier(0x7d07c0a053eb788e4bee9b61cc207ce2c1b85d879f999454dc9cba0ae6c2cfbd, 'Nestle');
    let sName = await kontract.suppliers.call(0x7d07c0a053eb788e4bee9b61cc207ce2c1b85d879f999454dc9cba0ae6c2cfbd);
    assert.equal(sName, 'Nestle', 'No supplier added');
    await kontract.addSupplier(accounts[1], 'Coca Cola');
    sName = await kontract.suppliers.call(accounts[1]);
    assert.equal(sName, 'Coca Cola', 'No supplier added');

    try{
      await kontract.addSupplier(0x7d07c0a053eb788e4bee9b61cc207ce2c1b85d879f999454dc9cba0ae6c2cfbd, 'Nestle',{from:accounts[1]});
    }catch (error){
      assert.equal(error.message, 'VM Exception while processing transaction: invalid opcode', 'Did not throw due to not owner');
    }
  })



  it('should throw error for not supplier', async function () {
    let kontract = await Kontract.deployed();
    await kontract.addSupplier(accounts[1], 'Coca Cola');

    try{
      await kontract.addLifecyclePoint('Milch', [], 'WSB', {from: accounts[2]});
    }catch (error){
      assert.equal(error.message, 'VM Exception while processing transaction: invalid opcode', 'Did not throw due to not a supplier');
    }

    let transactionAddr = await kontract.addLifecyclePoint('Milch', [], 'WSB', {from: accounts[1]});
    let id = extractId(transactionAddr);

    let origin = await kontract.getOrigin.call(id);
    assert.equal(await kontract.getProductName.call(id),'Milch',"No milk in the Blockchain!");
    assert.deepEqual(origin,[],"origin is fishy");

  })

  it('should throw error for not supplier of product', async function () {
    let kontract = await Kontract.deployed();
    await kontract.addSupplier(accounts[1], 'Coca Cola');

    let transactionAddr = await kontract.addLifecyclePoint('Milch', [], 'WSB', {from: accounts[1]});
    let id = extractId(transactionAddr);

    let origin = await kontract.getOrigin.call(id);
    assert.equal(await kontract.getProductName.call(id),'Milch',"No milk in the Blockchain!");
    assert.deepEqual(origin,[],"origin is fishy");

    try{
      await kontract.addInfo(id,'Sonderangebot ööö');
      await kontract.addChange(id,'Location', 'NSU');
      await kontract.addRecall(id,'Salmonellen pfui');
    }catch (error){
      assert.equal(error.message, 'VM Exception while processing transaction: invalid opcode', 'Did not throw due to not a supplier');
    }

    try{
      await kontract.addChange(id,'Location', 'NSU');
    }catch (error){
      assert.equal(error.message, 'VM Exception while processing transaction: invalid opcode', 'Did not throw due to not a supplier');
    }

    try{
      await kontract.addRecall(id,'Salmonellen pfui');
    }catch (error){
      assert.equal(error.message, 'VM Exception while processing transaction: invalid opcode', 'Did not throw due to not a supplier');
    }

  })

});

function extractId(transactionAddr){
      for (var i = 0; i < transactionAddr.logs.length; i++){
	  var log = transactionAddr.logs[i];
	  if (log.event == "Id"){
	      return log.args.id;
	  }
      }
}

