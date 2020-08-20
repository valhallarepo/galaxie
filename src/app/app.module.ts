import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpLoaderFactory } from './core/http-loader-factory';
import { FooterComponent } from './core/template/footer/footer.component';
import { HeaderComponent } from './core/template/header/header.component';
import { SidenavListComponent } from './core/template/sidenav/components/sidenav-list/sidenav-list.component';
import { SidenavComponent } from './core/template/sidenav/sidenav.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    SidenavListComponent,
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
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
