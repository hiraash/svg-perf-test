import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

class TouchAreaHammerConfig extends HammerGestureConfig {
    overrides = {
        pinch: { enable: true },
    };
}

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: HAMMER_GESTURE_CONFIG, useClass: TouchAreaHammerConfig },
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

