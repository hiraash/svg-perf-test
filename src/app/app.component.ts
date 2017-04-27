import { Component, ElementRef } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import * as sinfulMath from 'sinful-math';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  constructor(private element: ElementRef, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      console.log("console.log works well");
    });

    this.matrix = new Snap.Matrix();
  }

  public ngOnInit(){
    let el: HTMLElement = this.element.nativeElement;
    this.transLayer = <HTMLElement> el.querySelector('#trans');
  }

    private transLayer: HTMLElement;

    public get zoomLevel(): number {
        return this.matrix.split().scalex;
    }

    private iDeltaX = 0;
    private iDeltaY = 0;

    protected initialZoom: number = 1;

    private matrix: Snap.Matrix;

    public onTap( e: any ) {

    }

    public onPanStart( e: HammerInput ) {
      console.log( 'TouchArea - onTouchStart fired.' );
    }

    public onPanMove( e: HammerInput ) {
        console.log( 'TouchArea - onTouchMove fired.' );

      this.matrix.translate( (e.deltaX - this.iDeltaX) / this.zoomLevel, (e.deltaY - this.iDeltaY)/ this.zoomLevel )
      this.iDeltaX = e.deltaX;
      this.iDeltaY = e.deltaY;

      this.apply();
    }

    /**
     * Pinch start handler
     */
    public onPinchStart( e: HammerInput ) {
        console.log( 'TouchArea - onPinchStart fired.' );
    }

    /**
     * Pinch move handler that zooms and pans the diagram
     * based on users movement.
     */
    public onPinchMove( e: HammerInput ) {
        console.log( 'TouchArea - onPinchMove fired.' );

        const level = e.scale;
        const x = e.center.x;
        const y = e.center.y;
        let scale = sinfulMath.add([ 1, level, -this.initialZoom ]);

        // If the scale down change is more than 1 fold we need lock it
        // To 0.01 since scaling below that is not a practical requirement.
        scale = scale < 0 ? 0.01 : scale;

        const tx = x - this.matrix.split().dx;
        const ty = y - this.matrix.split().dy;
        this.matrix.scale( scale, scale, tx / this.zoomLevel, ty / this.zoomLevel );
        this.initialZoom = level;

        this.matrix.translate( (e.deltaX - this.iDeltaX) / this.zoomLevel, (e.deltaY - this.iDeltaY)/ this.zoomLevel )
        this.iDeltaX = e.deltaX;
        this.iDeltaY = e.deltaY;

        this.apply();
    }

    /**
     * Pan/Pinch end handler that commits changes
     * and complets the tap-drags as well.
     */
    public onEnd( e: HammerInput ) {
      console.log( 'TouchArea - onEnd fired.' );
      this.iDeltaX = 0;
      this.iDeltaY = 0;
      this.initialZoom = 1;
    }

    private apply() {
      this.transLayer.setAttribute('style', this.getTransformStyle())
    }

    protected getTransformStyle(): string {
        return `-webkit-transform: ${this.matrix.toString()};` +
                `-moz-transform: ${this.matrix.toString()};` +
                `-ms-transform: ${this.matrix.toString()};` +
                `-o-transform: ${this.matrix.toString()};` +
                `transform: ${this.matrix.toString()};`;
    }
}

