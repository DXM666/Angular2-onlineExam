import { NgModule } from '@angular/core';
import { NkCoreModule } from '@newkit/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { routing } from './app.routing';
import { ALL_PAGES } from './pages';
import { ALL_COMPONENTS } from './components';
import { ALL_PIPES } from './pipes';
import { ALL_SERVICES } from './services';




@NgModule({
  imports: [
    FormsModule,
    // Include it under 'imports' in your application module
    // after BrowserModule.
    HttpClientModule,
    NkCoreModule,
    routing
  ],
  declarations: [
    ...ALL_COMPONENTS,
    ...ALL_PAGES,
    ...ALL_PIPES,

  ],
  providers: [
    ...ALL_SERVICES
  ],
})
export class AppModule {

}
