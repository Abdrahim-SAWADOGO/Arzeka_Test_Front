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

  // Champs requis pour la quittance (toujours true)
  paymentDescription = 'Paiement quittance automatique';
  accountingOffice = 'Trésor Ouaga';
  accountantName = 'Comptable Général';
  address = '';

  loading = false;

  constructor(private paymentService: PaymentService) {}

  initiatePayment() {
    if (!this.firstname || !this.lastname || !this.mobile || !this.amount) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    this.loading = true;

    const payload = {
      amount: this.amount,
      firstname: this.firstname,
      lastname: this.lastname,
      mobile: this.mobile,
      generateReceipt: true, // toujours true désormais
      paymentDescription: this.paymentDescription,
      accountingOffice: this.accountingOffice,
      accountantName: this.accountantName,
      address: this.address
    };

    this.paymentService.initPayment(payload).subscribe({
      next: (res) => {
        console.log('✅ Paiement initialisé:', res);

        // 💾 Sauvegarde du mapped_order_id dans le localStorage
        localStorage.setItem('mapped_order_id', res.mapped_order_id);

        this.loading = false;

        // 🔁 Redirection vers la passerelle de paiement
        window.location.href = res.payment_url;
      },
      error: (err) => {
        console.error('❌ Erreur initPayment:', err);
        alert('Erreur pendant l’initialisation du paiement.');
        this.loading = false;
      }
    });
  }
}
