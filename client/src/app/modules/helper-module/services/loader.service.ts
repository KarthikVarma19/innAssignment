import { ApplicationRef, Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  private requestCount = 0;
  constructor(private appRef: ApplicationRef, private ngZone: NgZone) {}
  showLoader() {
    this.requestCount++;
    if (this.requestCount === 1) {
      this.ngZone.run(() => this.loadingSubject.next(true));
      // this.loadingSubject.next(true);
    }
  }
  hideLoader() {
    if (this.requestCount > 0) {
      this.requestCount--;
    }
    if (this.requestCount === 0) {
      this.ngZone.run(() => this.loadingSubject.next(false));
      // this.loadingSubject.next(false);
    }
  }
}
