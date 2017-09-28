import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Supplier} from './model';
import {List} from 'immutable';

@Injectable()
export class BackendService {

  getSuppliers(hash: string): Observable<List<Supplier>> {
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

}
