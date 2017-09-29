let Kontract = artifacts.require('./SCTransparency.sol');
const InputDataDecoder = require('ethereum-input-data-decoder');
let Web3 = require('web3');
let web3 = new Web3('http://localhost:8545/');
let kontract;

contract('Kontract', function(accounts) {


  it('should get transaction data', async function() {
    let txId = await initalKontractAndSuppliersAndLifeCyclePoint(accounts, 'Milch', [], 'WSB', {from: accounts[1]});
    let origin = await kontract.getOrigin.call(txId);
    assert.equal(await kontract.getProductName.call(txId),'Milch',"No milk in the Blockchain!");
    assert.deepEqual(origin,[],"origin is fishy");
    assert.equal(await kontract.getLocation.call(txId),   'WSB',"Milk ist not from WSB!");
  });



  it('should get TxID from QR Code', async function () {
    await initalKontract();
    kontract.mapQrCodeToTxid(1234567891,0x7d07c0a053eb788e4bee9b61cc207ce2c1b85d879f999454dc9cba0ae6c2cfbd);
    let txid = await kontract.getTxidFromQrCode.call(1234567891);
    let txHash = web3.utils.toHex(txid);
    assert.equal(txHash,0x7d07c0a053eb788e4bee9b61cc207ce2c1b85d879f999454dc9cba0ae6c2cfbd,"Wrong TxID");
  });



  it('should get TxID from QR Code where TxID should be from Product', async function () {
    let txId = await initalKontractAndSuppliersAndLifeCyclePoint(accounts,'Milch', [], 'WSB', {from: accounts[1]});
    kontract.mapQrCodeToTxid(1234567891,txId);
    let txIdFromQrCodeMapping = await kontract.getTxidFromQrCode.call(1234567891);
    assert.deepEqual(txIdFromQrCodeMapping,txId,"Wrong TxID");
    assert.equal(await kontract.getProductName.call(txId),'Milch',"No milk in the Blockchain!");
    assert.equal(await kontract.getLocation.call(txId),   'WSB',"Milk ist not from WSB!");
  });



  it('should check supplier added', async function () {
    await initalKontractAndSuppliers(accounts);
    let sName = await kontract.suppliers.call(accounts[1]);
    assert.equal(sName, 'Account 1', 'No Account 1 supplier added');
    sName = await kontract.suppliers.call(accounts[2]);
    assert.equal(sName, 'Account 2', 'No Account 2 supplier added');
    sName = await kontract.suppliers.call(accounts[3]);
    assert.equal(sName, 'Account 3', 'No Account 3 supplier added');
  })



  it('should throw error for not owner', async function () {
    await initalKontractAndSuppliers(accounts);
    try{
      await kontract.addSupplier(accounts[1], 'Account 1',{from:accounts[1]});
    }catch (error){
      assert.equal(error.message, 'VM Exception while processing transaction: invalid opcode', 'Did not throw due to not owner');
    }
  })



  it('should throw error for not supplier', async function () {
    await initalKontractAndSuppliers(accounts);
    try{
      await initalLifecyclePoint('Milch', [], 'WSB', {from: accounts[0]});
    }catch (error){
      assert.equal(error.message, 'VM Exception while processing transaction: invalid opcode', 'Did not throw due to not a supplier');
    }

    let txId = await initalLifecyclePoint('Milch', [], 'WSB', {from: accounts[1]});
    let origin = await kontract.getOrigin.call(txId);
    assert.equal(await kontract.getProductName.call(txId),'Milch',"No milk in the Blockchain!");
    assert.deepEqual(origin,[],"origin is fishy");
  })

  it('should throw error for not supplier of product', async function () {
    await initalKontractAndSuppliers(accounts);
    let txId = await initalLifecyclePoint('Milch', [], 'WSB', {from: accounts[1]});

    try{
      await kontract.addInfo(txId,'Sonderangebot ööö');
    }catch (error){
      assert.equal(error.message, 'VM Exception while processing transaction: invalid opcode', 'Did not throw due to not a supplier');
    }
    try{
      await kontract.addChange(txId,'Location', 'NSU');
    }catch (error){
      assert.equal(error.message, 'VM Exception while processing transaction: invalid opcode', 'Did not throw due to not a supplier');
    }
    try{
      await kontract.addRecall(txId,'Salmonellen pfui');
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
async function initalKontract() {
  kontract =  await Kontract.deployed();
}

async function initalSuppliers(accounts) {
  await kontract.addSupplier(accounts[1], 'Account 1');
  await kontract.addSupplier(accounts[2], 'Account 2');
  await kontract.addSupplier(accounts[3], 'Account 3');
}

async function initalKontractAndSuppliers(accounts) {
  await initalKontract();
  await initalSuppliers(accounts);
}

async function initalLifecyclePoint(name,origin,location,account) {
  let transactionAddr = await kontract.addLifecyclePoint(name, origin, location, account);
  return extractId(transactionAddr);
}

async function initalKontractAndSuppliersAndLifeCyclePoint(accounts, name, origin, location, account) {
  await initalKontract();
  await initalSuppliers(accounts);
  return await initalLifecyclePoint(name, origin, location, account)
}

