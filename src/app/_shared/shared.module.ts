import {ModuleWithProviders, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ClickOutsideModule} from 'ng4-click-outside';
import {ConfirmModalComponent} from './confirm-modal/confirm-modal.component';
import {UiSwitchModule} from 'ngx-toggle-switch';
import {SharedService} from './shared.service';
import {NumberOnlyDirective} from './number-only.directive';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    declarations: [ConfirmModalComponent, NumberOnlyDirective],
    imports: [
        UiSwitchModule,
        NgxDatatableModule,
        MatDialogModule,
        MatButtonModule
    ],
    exports: [
        ReactiveFormsModule,
        PerfectScrollbarModule,
        MatTooltipModule,
        UiSwitchModule,
        NgxDatatableModule,
        NumberOnlyDirective,
        ClickOutsideModule
    ],
    entryComponents: [ConfirmModalComponent]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [SharedService]
        };
    }
}
