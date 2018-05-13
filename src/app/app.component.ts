import { Component, OnInit } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { Subscription } from 'rxjs/Subscription';
import { CognitiveService } from './../providers/cognitive-services/cognitive.service';
import { AppService } from './app.service';
import { WavRecorder } from '../providers/web-audio/wav-recorder';
@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  rootPage:any = TabsPage;
  speaking: boolean;
  spokenMessage: string;
  messageSubscription: Subscription;
  debug:string;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public cognitiveService: CognitiveService,
    public appService: AppService,
    public loadingCtrl: LoadingController,
    public recorder: WavRecorder) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    // recorder.waitForWAA().subscribe(()=>{
    //   recorder.resetPeaks();
    // });
  }

  ngOnInit() {
    this.messageSubscription = this.cognitiveService.listenMessage.subscribe((message) => {
      if(message.RecognitionStatus == 'Success'){
        this.spokenMessage += ' ' + message.DisplayText;
        const lowerMsg = this.spokenMessage.toLowerCase();
        if(lowerMsg.indexOf('go to') != -1 && lowerMsg.indexOf('heart disease') != -1) {
          // this.goToForm('hd');
          this.appService.emitMessage('hd');
          // this.stop(true); // Dont need to stop here when using DEVICE AUDIOINPUT, only need with native SpeechRecognition
        }
        if(lowerMsg.indexOf('go to') != -1 && lowerMsg.indexOf('flu') != -1) {
          this.appService.emitMessage('flu');
          // this.stop(true);
        }
      }
      if(typeof message == 'string'){
        this.debug = '';
        this.debug += message;
      }
    });
  }
  speakStop() {
    this.debug = '';
    if(!this.speaking) {
      this.speaking = true;
      this.spokenMessage = '';
      const loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: `
            <div class="custom-spinner-container">
                <div class="custom-spinner-box">
                    Analyzing, please wait...
                </div>
            </div>`,
        duration: 100000
      });
      loading.present();
      this.recorder.start().then(() => {
        // READY
        this.debug += 'READY TO SPEAK';
        console.log('READY TO SPEAK');
        loading.dismiss()
      });
      // this.cognitiveService.speak();
    } else {
      this.stop(true);
    }

  }

  stop(erase: boolean) {
    const self = this;
    this.spokenMessage = erase ? '' : this.spokenMessage;
    this.speaking = false;
    this.debug = '';
    let subs = this.recorder.stop().subscribe((file: File | Blob) => {
      console.log(file);
      self.debug += 'Stoped! File created';
      // TODO send to Azure Bing Speech API by POST
      self.debug = '';
      self.cognitiveService.analyseSound(file).subscribe((data) => {
        console.log('analyseSound() @ success');
        self.debug = '';
        self.debug += file.size + ' -> ';
        self.debug += 'Success!!';
        console.log(`DATA  ${JSON.stringify(data)}`);
        self.cognitiveService.emitMessage(data);
        //subs.unsubscribe();
      }, (error) => {
        self.debug = '';
        self.debug += `An Error ocurred: ${JSON.stringify(error)}`;
        console.log(error);
      });
    }, (err: any) => {
      console.log(`ERROR -> , ${JSON.stringify(err)}`);
    });
    // this.cognitiveService.stopSpeaking();
  }
}
