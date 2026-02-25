import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  standalone: false,
  selector: 'app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: []
})
export class AppModalComponent implements OnInit {
  @ViewChild('staticModal')
  public staticModal: ModalDirective;
  @Input() public title: string;
  @Input() public set display(state) {
    if (state) {
      this.staticModal.show();
      this.onDisplayed.emit(true);
    } else {
      this.staticModal.hide();
      this.onDisplayed.emit(false);
    }
  }
  /* tslint:disable:no-output-on-prefix */
  @Output() onClose: EventEmitter<boolean> = new EventEmitter(false);
  @Output() onDisplayed: EventEmitter<boolean> = new EventEmitter(false);
  constructor() { }

  public ngOnInit() { }

  public closeModal() {
    this.onClose.emit(true);
  }
}
