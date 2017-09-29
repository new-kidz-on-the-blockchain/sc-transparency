import {HostListener, Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Supplier} from './model';
import {List} from 'immutable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

const Web3 = require('web3');
const contract = require('truffle-contract');
const metaincoinArtifacts = require('../../build/contracts/SCTransparency.json');

declare var window: any;

@Injectable()
export class BackendService {
  MetaCoin = contract(metaincoinArtifacts);
  web3: any;

  z = {};

  constructor(private _ngZone: NgZone) {
    this.z["50.131879, 8.749847"] = "Kaufland Warenhandel";
    this.z["49.302671, 9.367081"] = "Kaufland Warenhandel";
    this.z["53.940610, 10.306440"] = "Helga Hersteller";
    this.z["54.184321, 11.321741"] = "Algenfarmer Arnold";
    this.z["47.613276, 9.404404"] = "Bodensee Wasserentnahme Profis";
    this.z["50.131683, 8.749988"] = "Kaufland Warenhandel";
    this.z["49.293786, 9.373358"] = "Kaufland Warenhandel";
    this.z["49.293786, 9.373358"] = "Kaufland Warenhandel";
    this.z["50.939466, 6.855565"] = "Funny Frisch";
    this.z["50.069181, 8.503821"] = "Kartoffelbauer Karl";
    this.z["19.158395, 72.899095"] = "Evil Indian Curry Company";
    this.z["51.493195, 5.613059"] = "Kartoffelbauer Friedrich";
  }

  blah(subject: BehaviorSubject<List<Supplier>>, val: any) {
    let meta;
    this.MetaCoin
      .deployed()
      .then(instance => {
        console.log(instance);
        meta = instance;
      })
      .then(() => {
        return Promise.all(
          [meta.getProductName.call(val),
            meta.getLocation.call(val),
            meta.getOrigin.call(val)]);
      }).then(value => {
      const sup = new Supplier();
      sup.name = value[0];
      console.log(value);
      const arr = value[1].split(',');
      sup.coord = [Number(arr[1]), Number(arr[0])];
      sup.hash = this.z[value[1]];
      subject.next(subject.value.push(sup));
      for (const entry of value[2]) {
        this.blah(subject, entry); // 1, "string", false
      }
    }).catch(e => {
      console.log(e);
    });
  }

  getSuppliers(id: number): Observable<List<Supplier>> {

    const sub: BehaviorSubject<List<Supplier>> = new BehaviorSubject(List([]));

    setTimeout(() => {
      this.checkAndInstantiateWeb3();
      this.onReady();
      // this.refreshBalance();

      this.MetaCoin
        .deployed()
        .then(instance => {
          return instance.getTxidFromQrCode.call(id);
        }).then(value => {
        this.blah(sub, value);
      });


    }, 1000);


    //
    // this.ScTransparencyContract.setProvider(this.web3.currentProvider);
    // this.ScTransparencyContract.deployed().then(i => {
    //   console.log(i);
    //   return i.getTxidFromQrCode.call(1);
    // }).then(val => console.log(val));
    // // let txid = kontract.getTxidFromQrCode.call(1).then();
    // // assert.deepEqual(txid,id,"Wrong TxID");
    // //
    // // assert.equal(await kontract.getProductName.call(id),'Milch',"No milk in the Blockchain!");
    // // assert.equal(await kontract.getLocation.call(id),   'WSB',"Milk ist not from WSB!");
    //
    // // this.web3.eth.getTransaction('0x2a4c4b9afcc0a25f89173684cc481bcd80c02dc6bcc2fe91bad4a84e62367b75').then( val => {
    // //   console.log(this.web3.toASCII(val.input));
    // //   console.log(scTransparency);
    // //   const decoder = new InputDataDecoder(scTransparency.abi.toString());
    // //   const inputData = decoder.decodeData(val.input);
    // //   console.log(inputData);
    // // });
    //
    // // console.log(transaction);
    // // var inputData = decoder.decodeData(transaction.input);
    // // console.log(inputData);
    // // console.log(inputData.inputs[0]);
    //
    const sup1 = new Supplier();
    sup1.name = 'Supplier1';
    sup1.hash = '0xaabB03d6b421c8799F95C6Aab0e133307709c6BC';
    const sup2 = new Supplier();
    sup2.name = 'Supplier2';
    sup2.hash = '0xaaf324d6b421c8799F95C6Aab0e133307709c6BC';
    const sup3 = new Supplier();
    sup3.name = 'Supplier3';
    sup3.hash = '0xaabB03d6b421c8sdfF95C6Aab0e133asdfa9c6BC';
    const list = List.of(sup1, sup2, sup3);

    return sub.asObservable();

  }


  checkAndInstantiateWeb3 = () => {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      console.warn(
        'Using web3 detected from external source. If you find that your accounts don\'t appear or you have 0' +
        ' MetaCoin, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel free ' +
        'to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.warn(
        'No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you de' +
        'ploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here:' +
        ' http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(
        new Web3.providers.HttpProvider('http://localhost:8545')
      );
    }
    console.log('init web3');
  };

  onReady = () => {
    // Bootstrap the MetaCoin abstraction for Use.
    this.MetaCoin.setProvider(this.web3.currentProvider);
    // Get the initial account balance so it can be displayed.

  };

  refreshBalance = () => {
    let meta;
    this.MetaCoin
      .deployed()
      .then(instance => {
        console.log(instance);
        meta = instance;
        return meta.getTxidFromQrCode.call(1);
      })
      .then(value => {
        return meta.getProductName.call(value);
      }).then(value => {
      console.log(value);
    }).catch(e => {
      console.log(e);
    });
  };
}
