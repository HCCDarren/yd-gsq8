// ng-recaptcha: https://www.npmjs.com/package/ng-recaptcha#example-basic-v3
// https://www.google.com/recaptcha/admin/site/348496547
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FilterPipe } from './pipes/filter/filter.pipe';
import { SortPipe } from './pipes/sort/sort.pipe';

import { BlsMainPageComponent } from './pages/bls-main-page/bls-main-page.component';
import { GsqPageComponent } from './pages/gsq-page/gsq-page.component';

import { GsqSheetComponent } from './components/gsq-sheet/gsq-sheet.component';
import { GsqSheetDataComponent } from './components/gsq-sheet-data/gsq-sheet-data.component';
import { GsqSheetQueryComponent } from './components/gsq-sheet-query/gsq-sheet-query.component';
import { SiteLayoutModule } from './site-layout/site-layout.module';
import { GsqManagementPageComponent } from './pages/gsq-management-page/gsq-management-page.component';
import { V2Component } from './components/v2/v2.component';
import { CipherPageComponent } from './pages/cipher-page/cipher-page.component';
import { GsqButtonListComponent } from './components/gsq-button-list/gsq-button-list.component';


// import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings, RecaptchaFormsModule, RECAPTCHA_LANGUAGE } from 'ng-recaptcha';

@NgModule({
  declarations: [
    AppComponent,

    SortPipe,
    FilterPipe,

    BlsMainPageComponent,
    GsqPageComponent,

    GsqSheetComponent,
    GsqSheetDataComponent,
    GsqSheetQueryComponent,
    GsqManagementPageComponent,
    V2Component,
    CipherPageComponent,
    GsqButtonListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // RecaptchaModule,
    // RecaptchaFormsModule,

    AppRoutingModule,
    SharedModule,
    MaterialModule,
    SiteLayoutModule,
  ],
  providers: [
    // {
    //   provide: RECAPTCHA_SETTINGS,
    //   useValue: {
    //     siteKey: '6LejosUUAAAAAKE1SlIZK4RH-jic0rE5OlSuEaay',
    //     theme: 'dark',
    //     size: 'compact',
    //   } as RecaptchaSettings,
    // },
    // { provide: RECAPTCHA_LANGUAGE, useValue: 'zh-TW', },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
