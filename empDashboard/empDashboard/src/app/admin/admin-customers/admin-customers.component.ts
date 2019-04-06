import { Customer } from './../../models/customer';
import { Subscription } from 'rxjs/Subscription';
import { CustomerService } from './../../customer.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-admin-customers',
  templateUrl: './admin-customers.component.html',
  styleUrls: ['./admin-customers.component.css']
})
export class AdminCustomersComponent implements OnInit, OnDestroy {
  customers: Customer[];
  subscription: Subscription;
  tableResource: DataTableResource<Customer>;
  items: Customer[] = [];
  itemCount: number; 

  constructor(private customerService: CustomerService) { 
    this.subscription = this.customerService.getAll()
      .subscribe(customers => {
        this.customers = customers;
        this.initializeTable(customers);
      });
  }

  private initializeTable(customers: Customer[]) {
    this.tableResource = new DataTableResource(customers);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.tableResource) return;

    this.tableResource.query(params)
      .then(items => this.items = items);    
  }

  filter(query: string) { 
    let filteredCustomers = (query) ?
      this.customers.filter(p => p.customerName.toLowerCase().includes(query.toLowerCase()) 
      || p.location.toLowerCase().includes(query.toLowerCase())
      || p.emailId.toLowerCase().includes(query.toLowerCase())
      || p.apptDate.toLowerCase().includes(query.toLowerCase())
      || p.time.toLowerCase().includes(query.toLowerCase())
      || p.phoneNumber.toString().toLowerCase().includes(query.toString())) :
      this.customers;

    this.initializeTable(filteredCustomers);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

}
