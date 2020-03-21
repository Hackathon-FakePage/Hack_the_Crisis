import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { WebsiteAnalyzerComponent } from './website-analyzer/website-analyzer.component';
import { AlertsComponent } from './alerts/alerts.component';
import { AssistantComponent } from './assistant/assistant.component';
import { WebpageSelectComponent } from './webpage-select/webpage-select.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxHighlightWordsModule } from 'ngx-highlight-words';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    WebsiteAnalyzerComponent,
    AlertsComponent,
    AssistantComponent,
    WebpageSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgxHighlightWordsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
