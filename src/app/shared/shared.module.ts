import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

import { SafeResourceUrlPipe } from './pipes/safe-resource-url/safe-resource-url.pipe';
import { SafeUrlPipe } from './pipes/safe-url/safe-url.pipe';
import { RouterModule } from '@angular/router';
import { TimeAgoPipe } from './pipes/time-ago/time-ago.pipe';
import { SectionTitleComponent } from './components/section-title/section-title.component';
import { MoreComponent } from './components/more/more.component';
import { MultiLevelSelectorComponent } from './components/multi-level-selector/multi-level-selector.component';
import { MlsItemComponent } from './components/multi-level-selector/components/mls-item/mls-item.component';
import { MlsSubItemComponent } from './components/multi-level-selector/components/mls-sub-item/mls-sub-item.component';
import { MlsItemContainerComponent } from './components/multi-level-selector/components/mls-item-container/mls-item-container.component';

// to get the host name
// https://stackoverflow.com/questions/36222845/how-to-get-domain-name-for-service-in-angular2
import { WINDOW_PROVIDERS } from './providers/window.provider';
import { MoreResultsComponent } from './components/more-results/more-results.component';
import { ArrowButtonComponent } from './components/arrow-button/arrow-button.component';
import { TextTokensBlockComponent } from './components/text-tokens-block/text-tokens-block.component';
import { MaterialModule } from './material/material.module';
import { MarkdownComponent } from './components/markdown/markdown.component';
import { FeatureTitleComponent } from './components/feature-title/feature-title.component';

@NgModule({
  declarations: [
    SafeResourceUrlPipe,
    SafeUrlPipe,
    TimeAgoPipe,
    SectionTitleComponent,
    MoreComponent,
    MultiLevelSelectorComponent,
    MlsItemContainerComponent,
    MlsItemComponent,
    MlsSubItemComponent,
    MoreResultsComponent,
    ArrowButtonComponent,
    TextTokensBlockComponent,
    MarkdownComponent,
    FeatureTitleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true,
          breaks: true,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
        },
      },
    }),
  ],
  providers: [
    WINDOW_PROVIDERS, // <- add WINDOW_PROVIDERS here
  ],
  exports: [
    FlexLayoutModule,
    SafeResourceUrlPipe,
    SafeUrlPipe,
    TimeAgoPipe,
    SectionTitleComponent,
    MoreComponent,
    MultiLevelSelectorComponent,
    MoreResultsComponent,
    ArrowButtonComponent,
    TextTokensBlockComponent,
    MarkdownComponent,
    FeatureTitleComponent,
  ]
})
export class SharedModule { }
