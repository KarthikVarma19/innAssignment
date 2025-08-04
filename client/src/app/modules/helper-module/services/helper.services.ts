import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  private baseUrl = 'http://localhost:5555/api/helpers';

  constructor(private http: HttpClient) {}

  getAllHelpers(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getHelperById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createHelper(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  updateHelper(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteHelper(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
