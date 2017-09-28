import {HostListener, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Supplier} from './model';
import {List} from 'immutable';
const InputDataDecoder = require('ethereum-input-data-decoder');

const Web3 = require('web3');
const contract = require('truffle-contract');
const scTransparency = require('../../build/contracts/SCTransparency.json');

declare var window: any;

@Injectable()
export class BackendService {

  constructor() {
    this.checkAndInstantiateWeb3();
    this.onReady();
  }

  ScTransparencyContract = contract(scTransparency);

  // TODO add proper types these variables
  account: any;
  accounts: any;
  web3: any;

  @HostListener('window:load')
  windowLoaded() {
    this.checkAndInstantiateWeb3();
    this.onReady();
  }

  getSuppliers(hash: string): Observable<List<Supplier>> {

    this.web3.eth.getTransaction('0x2a4c4b9afcc0a25f89173684cc481bcd80c02dc6bcc2fe91bad4a84e62367b75').then( val => {
      console.log(this.web3.toASCII(val.input));
      console.log(scTransparency);
      const decoder = new InputDataDecoder(scTransparency.abi.toString());
      const inputData = decoder.decodeData(val.input);
      console.log(inputData);
    });

    // console.log(transaction);
    // var inputData = decoder.decodeData(transaction.input);
    // console.log(inputData);
    // console.log(inputData.inputs[0]);

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

    return Observable.of(list);

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
    this.ScTransparencyContract.setProvider(this.web3.currentProvider);
    console.log('init Contract');
    // Get the initial account balance so it can be displayed.

  }
}
