import { KerasJS } from 'keras-js';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatPage } from '../chat_watson/chat'
import { FormBuilderCustom } from './formbuilder/form-template/formBuilder';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  selected: boolean = false;
  model: any;
  constructor(public navCtrl: NavController) {}
  
  ngOnInit() {
    this.selected = false;
    console.log("about to import KerasJS");
    console.dir(KerasJS);
    // this.model = new KerasJS.Model({
    //   filepaths: {
    //     model:  'model.json',
    //     weights: 'model-dsbowl2018-3_weights.buf',
    //     metadata: 'model-dsbowl2018-3_metadata.json',
    //   },
    //   gpu: true,
    // });
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
}
