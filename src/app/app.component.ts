import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeProvider } from './core/tools/theme.provider';
import { takeUntilDestroy } from './core/tools/take-until-destroy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  globalTheme: string;

  constructor(public translate: TranslateService,
    private themeProvider: ThemeProvider) {

    translate.addLangs(['pt-br', 'en', 'es']);
    translate.setDefaultLang('pt-br');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/pt-br|en|es/) ? browserLang : 'pt-br');
  }

  ngOnInit() {
    this.themeProvider.globalThemeObservable
      .pipe(takeUntilDestroy(this))
      .subscribe(theme => {
        this.globalTheme = theme;
      });
  }

  ngOnDestroy(): void {
  }

}
