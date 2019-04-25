import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CustomerService } from './../../customer.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take'; 

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  locations$;
  customer = {}; 
  id;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private customerService: CustomerService) {
    this.locations$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.customerService.get(this.id).take(1).subscribe(p => this.customer = p);
  }

  save(customer) { 
    if (this.id) this.customerService.update(this.id, customer);
    else this.customerService.create(customer);
    
    this.router.navigate(['/']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this customer?')) return;
    
    this.customerService.delete(this.id);
    this.router.navigate(['/']);
  }

  ngOnInit() {
  }

}
