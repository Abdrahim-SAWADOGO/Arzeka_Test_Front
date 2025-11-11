import { Component } from '@angular/core';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment-init',
  templateUrl: './payment-init.component.html',
  styleUrls: ['./payment-init.component.css']
})
export class PaymentInitComponent {
  amount = '1000.00';
  firstname = '';
  lastname = '';
  mobile = '';

  // Champs de quittance
  generateReceipt = false;
  paymentDescription = '';
  accountingOffice = '';
  accountantName = '';
  address = '';

  loading = false;

  constructor(private paymentService: PaymentService) {}

  initiatePayment() {
    if (!this.firstname || !this.lastname || !this.mobile || !this.amount) {
      alert('Veuillez remplir les champs obligatoires.');
      return;
    }

    if (this.generateReceipt && (!this.paymentDescription || !this.accountingOffice || !this.accountantName)) {
      alert('Les champs de quittance sont requis si vous activez la génération de quittance.');
      return;
    }

    this.loading = true;

    const payload = {
      amount: this.amount,
      firstname: this.firstname,
      lastname: this.lastname,
      mobile: this.mobile,
      generateReceipt: this.generateReceipt,
      paymentDescription: this.paymentDescription,
      accountingOffice: this.accountingOffice,
      accountantName: this.accountantName,
      address: this.address
    };

    this.paymentService.initPayment(payload).subscribe({
      next: (res) => {
        console.log('✅ Paiement initialisé:', res);
        window.location.href = res.payment_url; // redirige vers la passerelle
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Erreur initPayment:', err);
        alert('Erreur pendant l’initialisation du paiement.');
        this.loading = false;
      }
    });
  }
}
