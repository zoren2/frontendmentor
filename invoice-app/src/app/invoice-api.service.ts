
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class InvoiceApiService {
  readonly inspectionAPIUrl: string = "https://localhost:{{Enter Your API Port}}/api"
  constructor(private http: HttpClient) { }
}
