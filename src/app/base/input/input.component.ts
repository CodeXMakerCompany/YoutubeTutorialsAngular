import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

interface Ip {
  fieldsName: string | any;
  fieldLabel: string | any;
  type: string | any;
}

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() inputData: Ip | undefined;
  @Output() finalValue: EventEmitter<any> = new EventEmitter();
  searchChangeObserver: any;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
  constructor() {}

  ngOnInit(): void {}
  onSearchChange(val: any) {
    if (!this.searchChangeObserver) {
      new Observable((observer) => {
        this.searchChangeObserver = observer;
      })
        .pipe(debounceTime(3000)) // wait 300ms after the last event before emitting last event
        .pipe(distinctUntilChanged()) // only emit if value is different from previous value
        .subscribe((e) => {
          this.finalValue.emit(e);
        });
    }
    this.searchChangeObserver.next(val.value);
  }
}
