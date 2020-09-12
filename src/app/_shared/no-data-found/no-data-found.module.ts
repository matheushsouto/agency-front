import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CommonModule} from '@angular/common';
import {NoDataFoundComponent} from './no-data-found.component';

@NgModule({
    declarations: [NoDataFoundComponent],
    imports: [
        MatIconModule,
        MatTooltipModule,
        MatButtonModule,
        CommonModule
    ],
    exports: [
        NoDataFoundComponent
    ]
})
export class NoDataFoundModule {
}
