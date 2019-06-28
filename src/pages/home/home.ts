import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatPage } from '../chat_watson/chat';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PictureAnalisysPage } from './../picture-analisys/picture-analisys';
import { AppService } from './../../app/app.service';
import { FormBuilder } from '../../components/formbuilder/Form/FormBuilder.component';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  model: any;
  options: CameraOptions;
  base64Image: string;
  constructor(public navCtrl: NavController, public camera: Camera,
              public appService: AppService) {}
  
  ngOnInit() {
    this.appService.listenMessage.subscribe((value: string) => {
      switch(value) {
        case 'hd':
          this.goToForm('hd');
          break;
        case 'flu':
          this.goToForm('flu');
          break;
      }
    })
  }

  goToChat(){
    this.navCtrl.push(ChatPage);
  }
  goToPictureAnalisys() {
    this.navCtrl.push(PictureAnalisysPage);
  }
  goToForm(value){
    this.navCtrl.push(FormBuilder, { form: value });
  }
  
}
