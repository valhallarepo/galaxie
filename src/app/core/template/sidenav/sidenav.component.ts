import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { AppConfig } from '../../app.config';
import { ThemeProvider } from '../../theme.provider';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, AfterViewInit {

  public mobileQuery: MediaQueryList;

  form: FormGroup;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private themeProvider: ThemeProvider) {
    this.mobileQuery = this.media.matchMedia('(max-width: 768px)');
    this.mobileQuery.addListener(() => this.changeDetectorRef.detectChanges());
  }

  ngOnInit(): void {
    this.createForm();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.themeProvider.setGlobalTheme(AppConfig.DEFAULT_THEME);
      this.form.get('colorTheme').setValue(AppConfig.DEFAULT_THEME);
    });
  }

  private createForm() {
    this.form = new FormGroup({
      colorTheme: new FormControl()
    });
  }

  themeChange($event: MatRadioChange) {
    this.themeProvider.setGlobalTheme($event.value);
  }

}
