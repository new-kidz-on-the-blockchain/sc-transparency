pragma solidity ^0.4.2;

contract SCTransparency{

  struct LifeCyclePoint{
    string productName;
    address[] origin;
    string location;
  }

  mapping (uint => address) public qrCodeToTx;

  LifeCyclePoint[] lifeCyclePoints;

  function addLifecyclePoint(string _productName, address[] _origin, string _location){
    LifeCyclePoint memory p = LifeCyclePoint(_productName, _origin, _location);

    lifeCyclePoints.push(p);

  }


  event Info(address txid, string info);
  event Change(address txid,string attribute, string value);
  event Recall(address txid, string reason);

  function addInfo(address _txid, string _info){
    Info(_txid, _info);
  }

  function addRecall(address _txid, string _reason){
    Recall(_txid, _reason);
  }
  function addChange(address _txid, string _attribute, string _value){
    Change(_txid, _attribute, _value);
  }
  
}
