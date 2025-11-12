import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  mappedOrderIdFromGateway: string | null = null;
  status: any = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      // selon la doc de la passerelle
      this.mappedOrderIdFromGateway =
        params.get('paymentRequestID') ||
        params.get('paymentRequestId') ||
        localStorage.getItem('mapped_order_id');

      if (this.mappedOrderIdFromGateway) {
        this.checkPayment(this.mappedOrderIdFromGateway);
      } else {
        this.error = 'Aucune référence de paiement trouvée.';
        this.loading = false;
      }
    });
  }

  checkPayment(mappedOrderId: string) {
    this.loading = true;
    this.paymentService.checkPayment(mappedOrderId).subscribe({
      next: (res) => {
        this.status = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur checkPayment', err);
        this.error = 'Erreur lors de la vérification du paiement.';
        this.loading = false;
      }
    });
  }

  downloadReceipt(orderId: string) {
    this.paymentService.downloadReceipt(orderId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `quittance_${orderId}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Erreur téléchargement quittance', err);
        alert("Impossible de télécharger la quittance pour le moment.");
      }
    });
  }
}
