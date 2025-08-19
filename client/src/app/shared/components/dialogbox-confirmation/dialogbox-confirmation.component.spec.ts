import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogboxConfirmationComponent } from './dialogbox-confirmation.component';

describe('DialogboxConfirmationComponent', () => {
  let component: DialogboxConfirmationComponent;
  let fixture: ComponentFixture<DialogboxConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogboxConfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogboxConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
