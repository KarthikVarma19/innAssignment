import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { HelperDataAdapter, IHelperDetailsDisplay } from '../adapters/helperdata-adapter';



@Injectable({
  providedIn: 'root',
})
export class HelperService {
  private baseUrl = 'http://localhost:5555/api/helpers';
  private uploadUrl = 'http://localhost:5555/api/upload';

  constructor(private http: HttpClient) {}

  getDataTransformed(
    context: 'edit' | 'preview' | 'admin',
    rawData: any
  ): IHelperDetailsDisplay {
    let adapter: (data: any) => IHelperDetailsDisplay;

    switch (context) {
      case 'edit':
        adapter = HelperDataAdapter.fromBackend;
        break;

      case 'preview':
        adapter = HelperDataAdapter.fromAddHelperPageFinalStage;
        break;
      case 'admin':
        adapter = HelperDataAdapter.fromBackend;
        break;
      default:
        throw new Error(`Unsupported context: ${context}`);
    }
    return adapter(rawData);
  }

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
    const route = `${this.baseUrl}/${id}`;
    console.log('Deleting helper with id:', id, 'Route:', route); // Debug log
    // Make sure to subscribe to this method wherever you call it, e.g., this.helperService.deleteHelper(id).subscribe(...)
    return this.http.delete(route);
  }

  editHelper(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  uploadMultipleFilesToCloud(data: any): Observable<any> {
    return this.http.post(`${this.uploadUrl}/multiple`, data)
  }
}
