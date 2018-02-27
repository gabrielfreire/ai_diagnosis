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
      await this.cameraProvider.getPictureFromCamera().then(picture => {
        if (picture) {
          this.picture = picture;
        }
  
        if (!this.isMute) {
          // this.nativeActionsProvider.playAudio(this.translateTexts[1].text, this.language);
        }
      }, error => {
        console.error(error);
      });

      await this.cognitiveService.analyzeImage(this.picture).then(description => {
        descriptionAnalyzedImage = description;
      }, error => {
        console.error(error);
      });

      loading.dismiss();

    } catch(error) {
      console.error(`${JSON.stringify(error)}`);
    }
  }


}
