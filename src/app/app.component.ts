import { Component } from '@angular/core';
import liff from '@line/liff';
interface getProfile {
  displayName: string;
  userId: string;
  pictureUrl: string | undefined;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Frontend-Angular-Tailwind';
  getProfile: getProfile = {
    displayName: '',
    userId: '',
    pictureUrl: '',
  };
  async ngOnInit() {
    await liff.init({
        liffId: '1657193195-wMZjNpWK', // Use own liffId
        withLoginOnExternalBrowser: true, // Enable automatic login process
      })
      .catch((err) => {
        throw err;
      });

    if (liff.isLoggedIn()) {
      let getProfile = await liff.getProfile();
      this.getProfile.displayName = getProfile.displayName;
      this.getProfile.userId = getProfile.userId;
      this.getProfile.pictureUrl = getProfile.pictureUrl;
      let idToken = liff.getDecodedIDToken();
      console.log(idToken);
    }else {
      liff.login();
    }
  }
}
