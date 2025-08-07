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
import IkycDocumentDetails from '../../../modules/helper-module/components/kycdocument/kycdocument.component';

@Component({
  selector: 'app-dialogbox',
  standalone: true,
  imports: [],
  templateUrl: './dialogbox.component.html',
  styleUrl: './dialogbox.component.scss',
})
export class DialogboxComponent implements OnInit, OnDestroy {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  @Input() componentType!: Type<any>;
  @Input() componentData: any;

  @Output() onClose = new EventEmitter<IkycDocumentDetails>();

  dialogBoxData: any;

  private componentRef: any;

  ngOnInit(): void {
    this.container.clear();
    this.componentRef = this.container.createComponent(this.componentType);
    if (this.componentData) {
      Object.assign(this.componentRef.instance, this.componentData);
    }
    if (this.componentRef.instance.dataFromDialog instanceof EventEmitter) {
      this.componentRef.instance.dataFromDialog.subscribe((data: any) => {
        console.log('Received from child:', data);
        this.close(data);
      });
    }
  }

  close(data?: IkycDocumentDetails) {
    this.container.clear();
    if (data && data.documentType !== undefined) {
      this.onClose.emit(data); // Emit event to parent
    } else {
      this.onClose.emit({
        documentType: '',
        fileName: '',
        base64: '',
        fileSize: 0,
      }); // Emit undefined if data or documentType is undefined
    }
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
