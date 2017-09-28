  pragma solidity ^0.4.2;

  contract SCTransparency{

    struct LifeCyclePoint{
      string productName;
      uint[] origin;
      string location;
    }

    address private owner;

    function SCTransparency(){
      owner = tx.origin;
    }

    mapping (uint => uint) public qrCodeToTx;

    LifeCyclePoint[] lifeCyclePoints;

    function addLifecyclePoint(string _productName, uint[] _origin, string _location) returns (uint){

      LifeCyclePoint memory p = LifeCyclePoint(_productName, _origin, _location);

      lifeCyclePoints.push(p);
      return lifeCyclePoints.length-1;

    }

    function mapQrCodeToTxid(uint _qrcode, uint _txid){
      qrCodeToTx[_qrcode] = _txid;
    }

    function getTxidFromQrCode(uint _qrcode) returns (uint){
      return qrCodeToTx[_qrcode];
  }

    event Info(uint _txid, string _info);
    event Change(uint _txid,string _attribute, string _value);
    event Recall(uint _txid, string _reason);

    function addInfo(uint _txid, string _info){
      Info(_txid, _info);
    }

    function addRecall(uint _txid, string _reason){
      Recall(_txid, _reason);
    }
    function addChange(uint _txid, string _attribute, string _value){
      Change(_txid, _attribute, _value);
    }

  }
