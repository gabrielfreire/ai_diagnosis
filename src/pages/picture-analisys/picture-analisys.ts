import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { CameraProvider } from './../../providers/camera/camera.provider';
import { NativeStorage } from '@ionic-native/native-storage';
import { CognitiveService } from './../../providers/cognitive-services/cognitive.service';
/**
 * Generated class for the PictureAnalisysPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-picture-analisys',
  templateUrl: 'picture-analisys.html',
})
export class PictureAnalisysPage {
  isMute: boolean = false;
  loading: string = 'Loading';
  picture: boolean|string = false;
  imageDescription: string = '';
  isSpeak: boolean = false;
  error: boolean|string = false;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public cameraProvider: CameraProvider, 
              private cognitiveService: CognitiveService, 
              public loadingCtrl: LoadingController, 
              private nativeStorage: NativeStorage) {
  }

  ionViewCanEnter() {
    // this.nativeStorage.getItem('isMute').then(data => this.isMute = data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PictureAnalisysPage');
    return this.takePicture();
  }

  async takePicture(): Promise<any> {
    const loading = this.loadingCtrl.create({
      content: `${this.loading} ...`
    });
    let descriptionAnalyzedImage;
    loading.present();

    this.isSpeak = false;
    this.imageDescription = '';
    try {
      let picture = await this.cameraProvider.getPictureFromCamera();
      if (picture) {
        // this.picture = picture;
        this.setPicture(picture); // picture is the temporary path
        this.cognitiveService.analyzeImage(picture).subscribe((data) => {
          loading.dismiss();
          descriptionAnalyzedImage = data.description.captions[0].text;
          this.imageDescription = descriptionAnalyzedImage;
        });
      }
      // if (!this.isMute) {
        // this.nativeActionsProvider.playAudio(this.translateTexts[1].text, this.language);
      // }
    } catch(error) {
      loading.dismiss();
      this.error = `Error: ${JSON.stringify(error)}`;
      console.error(this.error);
    }
  }

  getBase64(file: any, cb: any): void {
    const self = this;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
        self.error = `${JSON.stringify(error)}`;
    };
  }

  setPicture(picture: string){
    // const self = this;
    // let request = new XMLHttpRequest();
    // request.open('GET', picture, true);
    // request.responseType = 'blob';
    // request.onload = () => {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(request.response);
    //   reader.onload = function () {
    //       self.picture = reader.result;
    //   };
    // };
    // request.onerror = (err) => {
    //   self.error = `${JSON.stringify(err)}`;
    // }
    // request.send();
    this.picture = "data:image/jpeg;base64, " + picture;
  }
}