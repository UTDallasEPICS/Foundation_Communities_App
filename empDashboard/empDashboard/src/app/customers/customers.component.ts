import { Customer } from './../models/customer';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from './../customer.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent  {
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  location: string;

  constructor(
    route: ActivatedRoute,
    customerService: CustomerService
  ) {
    customerService
      .getAll()
      .switchMap(customers => {
        this.customers = customers;
        return route.queryParamMap;
      })
      .subscribe(params => {
        this.location = params.get('location');
        
        this.filteredCustomers = (this.location) ? 
          this.customers.filter(p => p.location === this.location) : 
          this.customers;
      });
  }

}
