import { CipherPageComponent } from './pages/cipher-page/cipher-page.component';
import { V2Component } from './components/v2/v2.component';
import { GsqManagementPageComponent } from './pages/gsq-management-page/gsq-management-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlsMainPageComponent } from './pages/bls-main-page/bls-main-page.component';
import { GsqPageComponent } from './pages/gsq-page/gsq-page.component';
import { environment } from 'src/environments/environment';

const V2_URL_SEGMENT = environment.V2UrlSegment;

const routes: Routes = [
  { path: '', redirectTo: '/bls', pathMatch: 'full' },
  { path: 'bls', component: BlsMainPageComponent },
  { path: 'gsq', component: GsqPageComponent },
  { path: 'gsq/:id', component: GsqPageComponent },
  { path: 'gsm/:id', component: GsqManagementPageComponent },
  {
    path: V2_URL_SEGMENT, component: V2Component, children: [
      { path: '', redirectTo: '/bls', pathMatch: 'full' },
      { path: 'bls', component: BlsMainPageComponent },
      { path: 'gsq', component: GsqPageComponent },
      { path: 'gsq/:id', component: GsqPageComponent },
      { path: 'gsq/:id/page/:page', component: GsqPageComponent },
      { path: 'gsm/:id', component: GsqManagementPageComponent },
      { path: 'cipher/:id', component: CipherPageComponent },
    ],
  },

  // { path: 'gfq', component: GfqPageComponent },
  // { path: 'gfq/:id', component: GfqPageComponent },
  // { path: 'gsq/:id/range/:rangeId', component: GsqPageComponent },
  { path: '**', component: BlsMainPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
