import { Component } from '@angular/core';
import liff from '@line/liff';
import {Subject, Observable} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
interface getProfile {
  displayName: string;
  userId: string;
  pictureUrl: string | undefined;
}
interface idToken {
  email: string | undefined;
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

  idToken: idToken = {
    email: '',
  }

  async ngOnInit() {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
    await liff.init({
      liffId: '1657193195-wMZjNpWK', // Use own liffId
      withLoginOnExternalBrowser: true, // Enable automatic login process
    })
      .catch((err) => {
        throw err;
      });

    if (liff.isLoggedIn()) {
      let getProfile = await liff.getProfile();
      let idToken = await liff.getDecodedIDToken();
      this.getProfile.displayName = getProfile.displayName;
      this.getProfile.userId = getProfile.userId;
      this.getProfile.pictureUrl = getProfile.pictureUrl;
      this.idToken.email = idToken?.email
      console.log(idToken?.email);

      // await navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } } })
    } else {
      liff.login();
    }

  }

  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string='';
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage|null = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  public triggerSnapshot(): void {
    this.trigger.next();
    this.toggleWebcam()
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }
}
