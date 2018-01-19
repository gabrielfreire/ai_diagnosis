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
  constructor(public navCtrl: NavController) {}
  
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
}
