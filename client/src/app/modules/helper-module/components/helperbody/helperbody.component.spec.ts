import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelperbodyComponent } from './helperbody.component';

describe('HelperbodyComponent', () => {
  let component: HelperbodyComponent;
  let fixture: ComponentFixture<HelperbodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelperbodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelperbodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
