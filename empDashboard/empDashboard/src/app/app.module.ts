import { CustomerService } from './customer.service';
import { CategoryService } from './category.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { UserService } from './user.service';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2'; 
import { AngularFireDatabaseModule } from 'angularfire2/database'; 
import { AngularFireAuthModule } from 'angularfire2/auth'; 
import { RouterModule } from '@angular/router'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { FormsModule } from '@angular/forms'; 
import { CustomFormsModule } from 'ng2-validation'; 
import { DataTableModule } from 'angular-4-data-table';

import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './customers/customers.component';
import { AdminCustomersComponent } from './admin/admin-customers/admin-customers.component';
import { LoginComponent } from './login/login.component';
import { CustomerFormComponent } from './admin/customer-form/customer-form.component';
import { CustomerFilterComponent } from './customers/customer-filter/customer-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    CustomersComponent,
    AdminCustomersComponent,
    LoginComponent,
    CustomerFormComponent,
    CustomerFilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { 
        path: '', 
        component: AdminCustomersComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      
      { path: 'customers', component: CustomersComponent },
      { path: 'login', component: LoginComponent },
     
      { 
        path: 'admin/customers/new', 
        component: CustomerFormComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/customers/:id', 
        component: CustomerFormComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
    ])    
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    CategoryService,
    CustomerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
