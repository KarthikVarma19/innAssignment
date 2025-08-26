import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogScannerComponent } from './dialog-scanner.component';

describe('DialogScannerComponent', () => {
  let component: DialogScannerComponent;
  let fixture: ComponentFixture<DialogScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogScannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
