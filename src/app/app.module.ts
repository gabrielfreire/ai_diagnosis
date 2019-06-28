import 'webdnn';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { NativeStorage } from '@ionic-native/native-storage';
import { AppService } from './app.service';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { ChatPage } from '../pages/chat_watson/chat'
import { PictureAnalisysPage } from '../pages/picture-analisys/picture-analisys';
import { TabsPage } from '../pages/tabs/tabs';

import { FormBuilder } from '../components/formbuilder/Form/FormBuilder.component';
import { DynamicQuestionComponent } from '../components/formbuilder/Question/DynamicQuestion.component';

import { QuestionControlService } from '../providers/form/question-control.service';
import { QuestionService } from '../providers/form/question.service';
import { WavRecorder, DiagnosticsService, CameraProvider, CognitiveService, AudioContextGenerator } from '../providers';

import { QuestionMapper } from './../mappers/question-mapper.service';
import { QuestionEventMapper } from './../mappers/event-mapper.service';

// const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
const config: SocketIoConfig = { url: 'https://imsdiag.herokuapp.com', options: {} };

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ChatPage,
    FormBuilder,
    PictureAnalisysPage,
    DynamicQuestionComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    FormBuilder,
    PictureAnalisysPage,
    DynamicQuestionComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileTransfer,
    SpeechRecognition,
    FileTransferObject,
    NativeStorage,
    TextToSpeech,
    Camera,
    QuestionControlService,
    QuestionService,
    QuestionMapper,
    QuestionEventMapper,
    DiagnosticsService,
    CognitiveService,
    CameraProvider,
    AppService,
    WavRecorder,
    AudioContextGenerator,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
