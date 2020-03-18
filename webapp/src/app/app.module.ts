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
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
