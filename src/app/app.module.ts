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
import { HomePage, LandingPage, SettingsPage, AuthModal, LoginModal, ServiceProviderPage, AlertsPage, MaintenancePage, FuelPage, AddFuelModal, VehicleDetailsPage} from '../pages/pages';
import {VehicleInfo, VehicleApi, ProviderApi, UserApi, AuthApi} from '../services/services';

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
    FuelPage,
    AddFuelModal,
    VehicleDetailsPage
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
    FuelPage,
    AddFuelModal,
    VehicleDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    VehicleInfo,
    VehicleApi,
    UserApi,
    ProviderApi,
    AuthApi,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
