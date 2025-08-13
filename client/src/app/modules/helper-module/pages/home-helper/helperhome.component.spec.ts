import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelperhomeComponent } from './helperhome.component';

describe('HelperhomeComponent', () => {
  let component: HelperhomeComponent;
  let fixture: ComponentFixture<HelperhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelperhomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelperhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
