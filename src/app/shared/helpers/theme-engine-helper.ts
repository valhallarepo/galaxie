import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeEngineHelper {

  public globalThemeObservable;
  private globalTheme = new Subject<string>();

  constructor() {
    this.globalThemeObservable = this.globalTheme.asObservable();
  }

  setGlobalTheme(theme: string): void {
    this.globalTheme.asObservable();
    this.globalTheme.next(theme);
  }

}
