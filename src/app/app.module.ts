import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentInitComponent } from './components/payment-init/payment-init.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { PaymentHistoryComponent } from './components/payment-history/payment-history.component';

@NgModule({
  declarations: [
    AppComponent,
    PaymentInitComponent,
    PaymentSuccessComponent,
    PaymentHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
