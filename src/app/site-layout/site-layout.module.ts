import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidenavListComponent } from './components/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidenavListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    NgMaterialMultilevelMenuModule,
    MaterialModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidenavListComponent,
  ]
})
export class SiteLayoutModule { }
