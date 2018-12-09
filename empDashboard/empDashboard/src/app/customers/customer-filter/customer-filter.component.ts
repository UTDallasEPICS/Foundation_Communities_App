import { CategoryService } from './../../category.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'customer-filter',
  templateUrl: './customer-filter.component.html',
  styleUrls: ['./customer-filter.component.css']
})
export class CustomerFilterComponent implements OnInit {
  locations$;
  @Input('location') location;

  constructor(categoryService: CategoryService) {
    this.locations$ = categoryService.getAll();
  }

  ngOnInit() {
  }

}
