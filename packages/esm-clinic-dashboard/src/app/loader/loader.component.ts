import { Component, Input } from '@angular/core';

@Component({
  standalone: false,
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone: false,
})
export class LoaderComponent {
  @Input()
  loadingMessage: string;
}
