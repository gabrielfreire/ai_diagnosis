import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatPage } from '../chat_watson/chat'
import { FormBuilderCustom } from './formbuilder/form-template/formBuilder';
import { Camera, CameraOptions } from '@ionic-native/camera';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  selected: boolean = false;
  model: any;
  options: CameraOptions;
  base64Image: string;
  constructor(public navCtrl: NavController, public camera: Camera) {}
  
  ngOnInit() {
    this.selected = false;
  }

  select() {
    this.selected = true;
  }
  
  unselect() {
    this.selected = false;
  }

  goToChat(){
    this.navCtrl.push(ChatPage);
  }

  goToForm(value){
    this.navCtrl.push(FormBuilderCustom, { form: value });
  }

  takePicture() {
    this.options = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      saveToPhotoAlbum: true
    };
    this.camera.getPicture(this.options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }
}
