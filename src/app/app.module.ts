import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from './auth/components/auth/register/register.component';
import {LoginComponent} from "./auth/components/auth/login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoAngularMaterialModule} from "./DemoAngularMaterialModule";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {OtpComponent} from './auth/components/auth/otp/otp.component';
import {CodeInputModule} from "angular-code-input";
import {GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig} from "@abacritt/angularx-social-login";
import {AdminInterceptor} from "./modules/admin/services/admin-auth-interceptor.service";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        OtpComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        DemoAngularMaterialModule,
        FontAwesomeModule,
        CodeInputModule,
        GoogleSigninButtonModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AdminInterceptor,
            multi: true
        },
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider('857286452271-sor3hu3bgqij1j4t185oeac3lv057qit.apps.googleusercontent.com')
                    }
                ]
            } as SocialAuthServiceConfig
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
