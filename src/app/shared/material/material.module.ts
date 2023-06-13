import { NgModule } from '@angular/core';
import {MatButtonModule, MatIconModule, MatSelectModule,
  MatInputModule, MatCheckboxModule, MatRadioModule, MatTooltipModule, MatSidenavModule} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [


    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatRadioModule,
    MatTooltipModule,
    MatSidenavModule,
    // MatToolbarModule,
    // MatTableModule,
    // MatSortModule,
    // MatSidenavModule,
    // MatListModule,
    // MatTooltipModule,
    // MatMenuModule,
    // MatCardModule,

    // MatTabsModule,
    // MatProgressSpinnerModule,
    // MatRippleModule,
    // MatDialogModule,
    // MatExpansionModule,
  ],
  exports: [


    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatRadioModule,
    MatTooltipModule,
    MatSidenavModule,
  ]
})
export class MaterialModule { }
