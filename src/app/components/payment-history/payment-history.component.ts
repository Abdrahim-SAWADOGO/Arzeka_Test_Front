import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';


@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent implements OnInit {
  transactions: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments() {
    this.loading = true;
    this.paymentService.getAllPayments().subscribe({
      next: (data) => {
        this.transactions = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur de chargement:', err);
        this.error = 'Impossible de charger les paiements.';
        this.loading = false;
      }
    });
  }

  downloadReceipt(orderId: string) {
    const link = document.createElement('a');
    link.href = `${this.paymentService.base}/download-receipt/${orderId}/`;
    link.target = '_blank';
    link.click();
  }
}
