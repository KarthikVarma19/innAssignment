import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddhelperskeletonComponent } from './addhelperskeleton.component';

describe('AddhelperskeletonComponent', () => {
  let component: AddhelperskeletonComponent;
  let fixture: ComponentFixture<AddhelperskeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddhelperskeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddhelperskeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
