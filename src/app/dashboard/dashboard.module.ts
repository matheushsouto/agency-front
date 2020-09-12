import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {SharedModule} from '../_shared/shared.module';
import {TodoComponent} from './todo/todo.component';
import {ChartsModule} from 'ng2-charts';
import {MatCardModule} from '@angular/material/card';
import {QRCodeModule} from 'angular2-qrcode';

@NgModule({
    declarations:
        [
            DashboardComponent,
            TodoComponent
        ],
    imports:
        [
            QRCodeModule,
            CommonModule,
            NgxChartsModule,
            DashboardRoutingModule,
            SharedModule,
            ChartsModule,
            MatCardModule,
        ]
})
export class DashboardModule {
}
