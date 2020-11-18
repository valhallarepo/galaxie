import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export default (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json');
