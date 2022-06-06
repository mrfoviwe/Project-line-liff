import { Component } from '@angular/core';
import liff from '@line/liff';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Frontend-Angular-Tailwind';
}

liff.init({
  liffId: '1657193195-wMZjNpWK', // Use own liffId
  withLoginOnExternalBrowser: true, // Enable automatic login process
}).then(() => {
  // Start to use liff's api
});
