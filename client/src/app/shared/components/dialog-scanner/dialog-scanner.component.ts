import { Component, inject, Input } from '@angular/core';
import { BarcodeScannerService } from '../../../modules/helper-module/services/barcode-scanner.service';
// the scanner!
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-dialog-scanner',
  standalone: true,
  imports: [ZXingScannerModule, NgIf],
  templateUrl: './dialog-scanner.component.html',
  styleUrl: './dialog-scanner.component.scss',
})
export class DialogScannerComponent {
  private readonly scannerService = inject(BarcodeScannerService);
  protected readonly scanResult = this.scannerService.getScanResult();
  async startScanner() {
    console.log('started');
    await this.scannerService.startScanner();
  }
  close(): void {}
  cancelButtonClicked(): void {}
  scanButtonClicked(): void {}
  @Input() data!: {
    heading: string;
    logo: string; // animated id-card
  };
  hasPermission = false;
  cameras: MediaDeviceInfo[] = [];

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onCamerasFound(devices: MediaDeviceInfo[]) {
    this.cameras = devices;
  }

  onScanError(error: any) {
    console.error('Scan error:', error);
  }
}

// https://res.cloudinary.com/karthikvarma/image/upload/v1756181944/inn-assignement/helpers/assets/qrcodescannergif_cnolpv.gif
