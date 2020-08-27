import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { i18nLoaderFactory } from './core/http/i18n-loader-factory';
import { FooterComponent } from './core/template/components/footer/footer.component';
import { HeaderComponent } from './core/template/components/header/header.component';
import { SidenavListComponent } from './core/template/components/sidenav/components/sidenav-list/sidenav-list.component';
import { SidenavComponent } from './core/template/components/sidenav/sidenav.component';
import { TemplateComponent } from './core/template/template.component';
import { HomeComponent } from './pages/home/home.component';
import { customizeMatPaginatorIntl } from './shared/components/customize-mat-paginator';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    SidenavListComponent,
    TemplateComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: i18nLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false
    })
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: customizeMatPaginatorIntl() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
