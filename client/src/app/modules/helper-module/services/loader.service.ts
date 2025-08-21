import { ApplicationRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  private requestCount = 0;
  constructor(private appRef: ApplicationRef) {}
  showLoader() {
    this.requestCount++;
    if (this.requestCount === 1) {
      setTimeout(() => this.loadingSubject.next(true), 0);
    }
  }
  hideLoader() {
    if (this.requestCount > 0) {
      this.requestCount--;
    }
    if (this.requestCount === 0) {
      setTimeout(() => this.loadingSubject.next(false), 0);
    }
  }
}
