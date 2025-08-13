import { NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dialogbox-document-download',
  standalone: true,
  imports: [NgIf],
  templateUrl: './dialogbox-document-download.component.html',
  styleUrl: './dialogbox-document-download.component.scss',
})
export class DialogboxDocumentDownloadComponent implements OnInit, OnChanges {
  @Input() componentHeading!: string;
  @Input() documentUrl!: string;
  close: () => void = () => {};
  sanitizedUrl!: SafeResourceUrl | null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges() {
    this.sanitizeUrl();
  }

  ngOnInit() {
    this.sanitizeUrl();
  }

  sanitizeUrl() {
    if (this.documentUrl) {
      this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.documentUrl
      );
    } else {
      this.sanitizedUrl = null;
    }
  }
  // print() {}

  // download() {}
}
