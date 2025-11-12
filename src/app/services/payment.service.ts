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
  base = environment.backendUrl; // URL de l'API Django

  constructor(private http: HttpClient) {}

  /**
   * 🔹 1️⃣ Initier un paiement (avec champs de quittance)
   * L’API Django gère generateReceipt = true par défaut
   */
  initPayment(payload: any): Observable<InitPaymentResponse> {
    return this.http.post<InitPaymentResponse>(`${this.base}/init-payment/`, payload);
  }

  /**
   * 🔹 2️⃣ Vérifier le statut d’un paiement
   */
  checkPayment(mappedOrderId: string): Observable<any> {
    return this.http.get<any>(`${this.base}/check-payment/${mappedOrderId}/`);
  }

  /**
   * 🔹 3️⃣ Récupérer l’historique complet des paiements
   */
  getAllPayments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/payment-history/`);
  }

  /**
   * 🔹 4️⃣ Télécharger une quittance PDF
   */
  downloadReceipt(orderId: string): Observable<Blob> {
    return this.http.get(`${this.base}/download-receipt/${orderId}/`, {
      responseType: 'blob' // très important pour un fichier binaire
    });
  }
}
