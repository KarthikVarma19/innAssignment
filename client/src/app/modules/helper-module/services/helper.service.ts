import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';

import {
  HelperDataAdapter,
  IHelperDetailsDisplay,
} from '../adapters/helperdata-adapter';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  private baseUrl = 'http://localhost:5555/api/helpers';
  private uploadUrl = 'http://localhost:5555/api/upload';

  constructor(private http: HttpClient, private loaderService: LoaderService) {}

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
    this.loaderService.showLoader();
    return this.http.get(`${this.baseUrl}`).pipe(
      finalize(() => {
        this.loaderService.hideLoader();
      })
    );
  }

  getHelpersPaged(offset: number, limit: number): Observable<any> {
    this.loaderService.showLoader();
    const params = { offset: offset.toString(), limit: limit.toString() };
    return this.http.get(`${this.baseUrl}/page`, { params }).pipe(
      finalize(() => {
        this.loaderService.hideLoader();
      })
    );
  }

  getHelperById(id: string): Observable<any> {
    this.loaderService.showLoader();
    return this.http.get(`${this.baseUrl}/${id}`).pipe(
      finalize(() => {
        this.loaderService.hideLoader();
      })
    );
  }

  createHelper(data: any): Observable<any> {
    this.loaderService.showLoader();
    return this.http.post(`${this.baseUrl}`, data).pipe(
      finalize(() => {
        this.loaderService.hideLoader();
      })
    );
  }

  updateHelper(id: string, data: any): Observable<any> {
    this.loaderService.showLoader();
    return this.http.put(`${this.baseUrl}/${id}`, data).pipe(
      finalize(() => {
        this.loaderService.hideLoader();
      })
    );
  }

  deleteHelper(id: string): Observable<any> {
    this.loaderService.showLoader();
    const route = `${this.baseUrl}/${id}`;
    return this.http.delete(route).pipe(
      finalize(() => {
        this.loaderService.hideLoader();
      })
    );
  }

  editHelper(id: string, data: any): Observable<any> {
    this.loaderService.showLoader();
    return this.http.put(`${this.baseUrl}/${id}`, data).pipe(
      finalize(() => {
        this.loaderService.hideLoader();
      })
    );
  }

  uploadMultipleFilesToCloud(data: any): Observable<any> {
    this.loaderService.showLoader();
    return this.http.post(`${this.uploadUrl}/multiple`, data).pipe(
      finalize(() => {
        this.loaderService.hideLoader();
      })
    );
  }
  getIdCard(id: string): Observable<any> {
    this.loaderService.showLoader();
    return this.http.get(`${this.baseUrl}/${id}/id-card`).pipe(
      finalize(() => {
        this.loaderService.hideLoader();
      })
    );
  }
}
