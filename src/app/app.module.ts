import {NgxMaskModule} from 'ngx-mask';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {ToastrModule} from 'ngx-toastr';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SiteLayoutComponent} from './_layout/site-layout/site-layout.component';
import {SiteHeaderComponent} from './_layout/site-header/site-header.component';
import {SiteFooterComponent} from './_layout/site-footer/site-footer.component';
import {AppLayoutComponent} from './_layout/app-layout/app-layout.component';
import {AppHeaderComponent} from './_layout/app-header/app-header.component';
import {AppSidebarComponent} from './_layout/app-sidebar/app-sidebar.component';
import {NgHttpLoaderModule} from 'ng-http-loader';
import {SharedModule} from './_shared/shared.module';
import {ChangePasswordModalComponent} from './_layout/app-header/change-password-modal/change-password-modal.component';
import {EditProfileComponent} from './_layout/app-header/edit-profile/edit-profile.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions, MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions} from '@angular/material/tooltip';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {OptionsComponent} from './_layout/app-option/options.component';
import {FlexModule} from '@angular/flex-layout';
import {ErrorInterceptor, JwtInterceptor} from './_helpers';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ChangePasswordTemporaryModalComponent} from './_layout/app-header/change-password-temporary-modal/change-password-temporary-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {_MatMenuDirectivesModule, MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

const DEFAULT_MAT_TOOLTIP_DEFAULT_OPTIONS: MatTooltipDefaultOptions = {
    'showDelay': 0,
    'hideDelay': 0,
    'touchendHideDelay': 0,
    'position': 'above',
};

const DEFAULT_APPEARANCE: MatFormFieldDefaultOptions = {
    appearance: 'outline'
};

// const DEFAULT_CURRENCY_MASK_CONFIG: CurrencyMaskConfig = {
//   align: 'left',
//   allowNegative: false,
//   allowZero: true,
//   decimal: ',',
//   precision: 2,
//   prefix: 'R$ ',
//   suffix: '',
//   thousands: '.',
//   nullable: false,
// };

@NgModule({
    declarations: [
        AppComponent,
        SiteLayoutComponent,
        SiteHeaderComponent,
        SiteFooterComponent,
        AppLayoutComponent,
        AppHeaderComponent,
        AppSidebarComponent,
        EditProfileComponent,
        ChangePasswordModalComponent,
        ChangePasswordTemporaryModalComponent,
        OptionsComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        SharedModule,
        PerfectScrollbarModule,
        InfiniteScrollModule,
        NgxMaskModule.forRoot(),
        NgHttpLoaderModule.forRoot(),
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-right',
            preventDuplicates: true
        }),
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        FlexModule,
        NgxDatatableModule.forRoot({
            messages: {
                emptyMessage: 'Nada encontrado',
                totalMessage: 'Total',
                selectedMessage: 'Selecionado',
            }
        }),
        MatDialogModule,
        MatToolbarModule,
        _MatMenuDirectivesModule,
        MatMenuModule,
        MatListModule,
    ],
    exports: [],
    entryComponents: [EditProfileComponent, ChangePasswordModalComponent, ChangePasswordTemporaryModalComponent],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        {provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
        {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: DEFAULT_APPEARANCE},
        // {provide: CURRENCY_MASK_CONFIG, useValue: DEFAULT_CURRENCY_MASK_CONFIG},
        {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: DEFAULT_MAT_TOOLTIP_DEFAULT_OPTIONS},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
