import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BikeServiceComponent } from './components/bike-service/bike-service.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';
import { ModalComponent } from './components/modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CompletedServicesComponent } from './components/completed-services/completed-services.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { ViewModalComponent } from './components/view-modal/view-modal.component';
import { InDevComponent } from './components/in-dev/in-dev.component';

@NgModule({
  declarations: [
    AppComponent,
    BikeServiceComponent,
    NavbarComponent,
    LoginComponent,
    ModalComponent,
    CompletedServicesComponent,
    ExpensesComponent,
    ViewModalComponent,
    InDevComponent
  ],
imports: [
BrowserModule,
BrowserAnimationsModule,
HttpClientModule,
AppRoutingModule,
FormsModule,
MatDialogModule,
ToastrModule.forRoot({
    timeOut: 3000,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
    closeButton: true,
    progressBar: true
})
],
  providers: [ AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
