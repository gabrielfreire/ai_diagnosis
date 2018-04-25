import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { Subscription } from 'rxjs/Subscription';
import { CognitiveService } from './../providers/cognitive-services/cognitive.service';
import { AppService } from './app.service';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  speaking: boolean;
  spokenMessage: string;
  messageSubscription: Subscription;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
    public cognitiveService: CognitiveService,
    public appService: AppService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  speakStop() {
    if(!this.speaking) {
      this.speaking = true;
      this.spokenMessage = '';
      this.messageSubscription = this.cognitiveService.listenMessage.subscribe((message) => {
        if(message.RecognitionStatus == 'Success'){
          this.spokenMessage += ' ' + message.DisplayText;
          const lowerMsg = this.spokenMessage.toLowerCase();
          if(lowerMsg.indexOf('go to') != -1 && lowerMsg.indexOf('heart disease') != -1) {
            // this.goToForm('hd');
            this.stop(true);
            this.appService.emitMessage('hd');
          }
          if(lowerMsg.indexOf('go to') != -1 && lowerMsg.indexOf('flu') != -1) {
            this.stop(true);
            this.appService.emitMessage('flu');
          }
        }
      });
      this.cognitiveService.speak();
    } else {
      this.stop(false);
    }
  
  }

  stop(erase: boolean) {
    this.spokenMessage = erase ? '' : this.spokenMessage;
    this.speaking = false;
    this.cognitiveService.stopSpeaking();
    if(this.messageSubscription) this.messageSubscription.unsubscribe();
  }
}
