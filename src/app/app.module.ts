import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../enviroments';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage, LandingPage, SettingsPage, AuthModal, LoginModal, ServiceProviderPage, AlertsPage, MaintenancePage, FuelPage} from '../pages/pages';
import {AuthApi,FuelService} from '../services/services';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LandingPage,
    SettingsPage,
    AuthModal,
    LoginModal,
    MaintenancePage,
    ServiceProviderPage,
    AlertsPage,
    FuelPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LandingPage,
    SettingsPage,
    AuthModal,
    LoginModal,
    MaintenancePage,
    ServiceProviderPage,
    AlertsPage,
    FuelPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthApi,
    FuelService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
