import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./shared/dashboard/dashboard.component";
import {UsersComponent} from "./shared/users/users.component";
import {SidebarComponent} from "./shared/sidebar/sidebar.component";
import {roleGuard} from "../../auth/components/services/guard/role.guard";

const routes: Routes = [
    {
        path: '',
        component: SidebarComponent,
        canActivate: [roleGuard], data: { roles: ['ADMIN'] },
        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {path: 'dashboard', component: DashboardComponent},
            {path: 'users', component: UsersComponent},
        ]
    },
    {path: '', redirectTo: 'admin/dashboard', pathMatch: 'full'},
    {path: '**', redirectTo: 'admin/dashboard'},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
