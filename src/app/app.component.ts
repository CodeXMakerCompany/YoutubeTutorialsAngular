import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  dataFrom: string = '';

  title = 'YoutubeTutorialsAngular';
  inputData = {
    fieldsName: 'Debounce Input',
    type: 'text',
    variant: 'Outlined',
    fieldLabel: 'Set a message here',
  };

  getFinalValue(v: string) {
    this.dataFrom = v;
  }
}
