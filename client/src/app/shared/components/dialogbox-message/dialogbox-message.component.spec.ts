import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogboxMessageComponent } from './dialogbox-message.component';

describe('DialogboxMessageComponent', () => {
  let component: DialogboxMessageComponent;
  let fixture: ComponentFixture<DialogboxMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogboxMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogboxMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
