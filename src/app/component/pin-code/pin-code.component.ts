import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pin-code',
  templateUrl: './pin-code.component.html',
  styleUrls: ['./pin-code.component.css'],
})
export class PinCodeComponent implements OnInit {
  password: Array<number> = [];

  constructor() {}

  async ngOnInit() {
  }

  onCodeChanged(code: string) {
  }

  onCodeCompleted(code: string) {
  }

  enter(n: number) {
    if (this.password.length <= 4) {
      this.password.push(n);
    }
  }
}
