import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './components/users/users.module';
import { OrganismeModule } from './components/organisme/organisme.module';
import { SmsModule } from './components/sms/sms.module';
import {EtablissementModule} from './components/etablissement/etablissement.module';
import { AuthInterceptor } from 'src/app/shared/service/auth/authconfig.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from "src/environments/environment";
import { from } from 'rxjs';
const config: SocketIoConfig = { url: environment.apiUrl, options: {} };
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    DashboardModule,
    SharedModule,
    UsersModule,
    OrganismeModule,
    SmsModule,
    EtablissementModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [

    {
   
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
