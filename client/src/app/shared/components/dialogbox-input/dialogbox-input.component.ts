import {
  Component,
  ViewChild,
  ViewContainerRef,
  Input,
  Output,
  EventEmitter,
  Type,
  OnInit,
  OnDestroy,
} from '@angular/core';
import IkycDocumentDetails from '../../../modules/helper-module/components/kycdocument-dialogbox-input/kycdocument.component';

@Component({
  selector: 'app-dialogbox-input',
  standalone: true,
  imports: [],
  templateUrl: './dialogbox-input.component.html',
  styleUrl: './dialogbox-input.component.scss',
})
export class DialogboxComponent implements OnInit, OnDestroy {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  @Input() componentType!: Type<any>;
  @Input() componentHeading!: string;
  @Output() onClose = new EventEmitter<IkycDocumentDetails>();
  dialogBoxData: any;
  private componentRef: any;

  ngOnInit(): void {
    this.container.clear();
    this.componentRef = this.container.createComponent(this.componentType);
    if (this.componentHeading) {
      Object.assign(this.componentRef.instance, this.componentHeading);
    }
    if (this.componentRef.instance.dataFromDialog instanceof EventEmitter) {
      this.componentRef.instance.dataFromDialog.subscribe((data: any) => {
        this.close(data);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  close(data?: IkycDocumentDetails) {
    this.container.clear();
    if (data && data.documentType !== undefined) {
      this.onClose.emit(data);
    } else {
      this.onClose.emit({
        documentType: '',
        fileName: '',
        base64: '',
        fileSize: 0,
      });
    }
  }
}
