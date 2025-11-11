import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

interface InitPaymentResponse {
  payment_url: string;
  mapped_order_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private base = environment.backendUrl;

  constructor(private http: HttpClient) { }

  // 🔹 Initier un paiement (avec champs de quittance)
  initPayment(payload: any): Observable<InitPaymentResponse> {
    return this.http.post<InitPaymentResponse>(`${this.base}/init-payment/`, payload);
  }

  // 🔹 Vérifier un paiement
  checkPayment(mappedOrderId: string): Observable<any> {
    return this.http.get<any>(`${this.base}/check-payment/${mappedOrderId}/`);
  }

  // 🔹 Récupérer l'historique des paiements
  getAllPayments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/payments/`);
  }
}
