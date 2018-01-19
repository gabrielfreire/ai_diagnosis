import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }          from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { ChatPage } from '../pages/chat_watson/chat'
import { FormBuilderCustom } from '../pages/home/formbuilder/form-template/formBuilder';
import { DynamicFormQuestionComponent } from '../pages/home/formbuilder/questions-template/dynamic-form-question.component';
import { QuestionControlService } from '../pages/home/formbuilder/questions/question-control.service';
import { QuestionService } from '../pages/home/formbuilder/questions/question.service';
import { QuestionMapper } from './mappers/question-mapper.service';
import { QuestionEventMapper } from './mappers/event-mapper.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabsPage } from '../pages/tabs/tabs';
import { DiagnosticsService } from './diagnostics/diagnostic.service';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
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
    FormBuilderCustom,
    DynamicFormQuestionComponent
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
    FormBuilderCustom,
    DynamicFormQuestionComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QuestionControlService,
    QuestionService,
    QuestionMapper,
    QuestionEventMapper,
    DiagnosticsService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
