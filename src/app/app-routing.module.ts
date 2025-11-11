import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentInitComponent } from './components/payment-init/payment-init.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { PaymentHistoryComponent } from './components/payment-history/payment-history.component';

const routes: Routes = [
  { path: '', component: PaymentInitComponent },
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: '**', redirectTo: '' },
  { path: 'history', component: PaymentHistoryComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
