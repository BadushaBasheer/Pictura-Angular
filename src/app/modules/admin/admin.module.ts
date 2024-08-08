import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {DemoAngularMaterialModule} from "../../DemoAngularMaterialModule";
import {AdminInterceptor} from "./services/admin-auth-interceptor.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {DashboardComponent} from "./shared/dashboard/dashboard.component";
import {SidebarComponent} from "./shared/sidebar/sidebar.component";
import {UsersComponent} from "./shared/users/users.component";
import { LayoutComponent } from './shared/layout/layout.component';
import {StorageService} from "../../auth/components/services/storage/storage.service";
import {MatGridListModule} from "@angular/material/grid-list";
import { PieComponent } from './shared/dashboard/components/charts/pie.component';
import { HistogramComponent } from './shared/dashboard/components/charts/histogram.component';

@NgModule({
    declarations: [
        DashboardComponent,
        SidebarComponent,
        UsersComponent,
        LayoutComponent,
        PieComponent,
        HistogramComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        FontAwesomeModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatGridListModule,
        DemoAngularMaterialModule
    ],
    exports: [
        UsersComponent
    ],
    providers: [
        StorageService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AdminInterceptor,
            multi: true
        }
    ]
})
export class AdminModule { }
