  pragma solidity ^0.4.2;

  contract SCTransparency{

    struct LifeCyclePoint{
      string productName;
      uint[] origin;
      string location;
      address supplier;
    }

    address private owner;

    function SCTransparency(){
      owner = tx.origin;
    }

    mapping (uint => uint) public qrCodeToTx;
    mapping (address => string) public suppliers;

    modifier onlyOwner {
      require(msg.sender == owner);
      _;
    }

    modifier isSupplier{
      require(bytes(suppliers[msg.sender]).length != 0);
      _;
    }

    modifier onlyProductSupplier(uint _txid){
      require(lifeCyclePoints[_txid].supplier == msg.sender);
      _;
    }

    LifeCyclePoint[] lifeCyclePoints;

    function addLifecyclePoint(string _productName, uint[] _origin, string _location) isSupplier{
      LifeCyclePoint memory p = LifeCyclePoint(_productName, _origin, _location, tx.origin);
      lifeCyclePoints.push(p);
      Id(tx.origin, lifeCyclePoints.length-1);
    }

    function mapQrCodeToTxid(uint _qrcode, uint _txid){
      qrCodeToTx[_qrcode] = _txid;
    }

    function getTxidFromQrCode(uint _qrcode) returns (uint){
      return qrCodeToTx[_qrcode];
    }

    function addSupplier(address _sup, string _name) onlyOwner{
      suppliers[_sup] = _name;
    }

    event Id(address _origin, uint id);
    event Info(uint _txid, string _info);
    event Change(uint _txid,string _attribute, string _value);
    event Recall(uint _txid, string _reason);

    function addInfo(uint _txid, string _info) onlyProductSupplier(_txid){
      Info(_txid, _info);
    }

    function addRecall(uint _txid, string _reason) onlyProductSupplier(_txid){
      Recall(_txid, _reason);
    }
    function addChange(uint _txid, string _attribute, string _value) onlyProductSupplier(_txid){
      Change(_txid, _attribute, _value);
    }

    function getProductName(uint i) constant returns ( string ){
      return lifeCyclePoints[i].productName;
    }

    function getOrigin(uint i) constant returns (uint[]) {
      return lifeCyclePoints[i].origin;
    }

    function getLocation(uint i) constant returns (string){
      return lifeCyclePoints[i].location;
    }

    function getSupplier(uint i) constant returns (address){
      return lifeCyclePoints[i].supplier;
    }

  }
