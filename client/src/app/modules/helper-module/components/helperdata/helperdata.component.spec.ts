import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelperdataComponent } from './helperdata.component';

describe('HelperdataComponent', () => {
  let component: HelperdataComponent;
  let fixture: ComponentFixture<HelperdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelperdataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HelperdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
