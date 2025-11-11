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
    // Selon la doc, la gateway redirige vers ?paymentRequestID=...
    this.route.queryParamMap.subscribe(params => {
      this.mappedOrderIdFromGateway = params.get('paymentRequestID') || params.get('paymentRequestId') || null;

      // Fallback : si on avait stocké mapped_order_id au moment de l'init
      if (!this.mappedOrderIdFromGateway) {
        const stored = localStorage.getItem('mapped_order_id');
        if (stored) this.mappedOrderIdFromGateway = stored;
      }

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
}
