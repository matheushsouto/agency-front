import {NgModule} from '@angular/core';
import {ActionComponent} from './action.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [ActionComponent],
    imports: [
        MatIconModule,
        MatTooltipModule,
        MatButtonModule,
        CommonModule
    ],
    exports: [
        ActionComponent
    ]
})
export class ActionModule {
}
