import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { WebsiteAnalyzerComponent } from './website-analyzer/website-analyzer.component';
import { AlertsComponent } from './alerts/alerts.component';
import { AssistantComponent } from './assistant/assistant.component';
import { WebpageSelectComponent } from './webpage-select/webpage-select.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { ErrorComponent } from './error/error.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { HighlightComponent } from './website-analyzer/highlight/highlight.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerInterceptor } from './common/interceptor/spinner-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    WebsiteAnalyzerComponent,
    AlertsComponent,
    AssistantComponent,
    WebpageSelectComponent,
    ModalComponent,
    ErrorComponent,
    HighlightComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbRatingModule,
    NgxSpinnerModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: SpinnerInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
