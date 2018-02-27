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
    this.nativeStorage.getItem('isMute').then(data => this.isMute = data);
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
        let request = new XMLHttpRequest();
        request.open('GET', picture, true);
        request.responseType = 'blob';
        request.onload = () => {
            var reader = new FileReader();
            reader.readAsDataURL(request.response);
            reader.onload =  async function(e){
              this.picture = 'data:image/jpeg;base64,' + reader.result;
            }.bind(this);
          };
          request.send();
        }
        await this.cognitiveService.analyzeImage(picture).then(description => {
          descriptionAnalyzedImage = description;
          this.imageDescription = descriptionAnalyzedImage;
        }, error => {
          console.error(error);
          this.error = error;
        });
  
      if (!this.isMute) {
        // this.nativeActionsProvider.playAudio(this.translateTexts[1].text, this.language);
      }
      loading.dismiss();

    } catch(error) {
      console.error(`${JSON.stringify(error)}`);
      this.error = error;
    }
  }

  getBase64(file: any, cb: any): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}


}
