import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./auth/components/auth/login/login.component";
import {RegisterComponent} from "./auth/components/auth/register/register.component";
import {OtpComponent} from "./auth/components/auth/otp/otp.component";

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'verify_account', component: OtpComponent},
    {path: 'user', loadChildren: () => import('./modules/user/user.module').then((user) => user.UserModule)},
    {path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then((admin) => admin.AdminModule)},
    {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
