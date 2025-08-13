import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogboxDocumentDownloadComponent } from './dialogbox-document-download.component';

describe('DialogboxDocumentDownloadComponent', () => {
  let component: DialogboxDocumentDownloadComponent;
  let fixture: ComponentFixture<DialogboxDocumentDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogboxDocumentDownloadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogboxDocumentDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
