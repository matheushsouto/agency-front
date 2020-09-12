import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoutingModule} from './routing.module';
import {ListComponent} from './list/list.component';
import {ManageComponent} from './manage/manage.component';
import {SharedModule} from '../_shared/shared.module';
import {NgxMaskModule} from 'ngx-mask';
import {SearchComponent} from './list/search/search.component';
import {CapabilityComponent} from './capability/capability.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {ActionModule} from '../_shared/action/action.module';
import {NoDataFoundModule} from '../_shared/no-data-found/no-data-found.module';

@NgModule({
    declarations:
        [
            ListComponent,
            ManageComponent,
            SearchComponent,
            CapabilityComponent
        ],
    imports:
        [
            SharedModule,
            CommonModule,
            RoutingModule,
            NgxMaskModule,
            MatFormFieldModule,
            MatInputModule,
            MatTabsModule,
            MatCardModule,
            MatButtonModule,
            MatCheckboxModule,
            MatSelectModule,
            MatTableModule,
            MatSortModule,
            MatIconModule,
            ActionModule,
            MatSnackBarModule,
            NoDataFoundModule,
            MatDialogModule
        ],
    entryComponents:
        [
            ManageComponent,
            CapabilityComponent
        ]
})
export class Module {
}
