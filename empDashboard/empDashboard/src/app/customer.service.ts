import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomerService {

  constructor(private db: AngularFireDatabase) { }

  create(customer) { 
    return this.db.list('/customers').push(customer);
  }

  getAll() {
    return this.db.list('/customers');
  }
  
  get(customerId) { 
    return this.db.object('/customers/' + customerId);
  }

  update(customerId, customer) { 
    return this.db.object('/customers/' + customerId).update(customer);
  }

  delete(customerId) { 
    return this.db.object('/customers/' + customerId).remove();
  }
}
