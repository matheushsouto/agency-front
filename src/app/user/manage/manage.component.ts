import {Component, Inject, Injector, ViewEncapsulation} from '@angular/core';
import {BaseManageComponent} from '../../base/base-manage.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class ManageComponent extends BaseManageComponent {
    user = this.userService.user;

    constructor(@Inject(Injector) injector: Injector, @Inject(MAT_DIALOG_DATA) public data) {
        super(injector);
        this.routeApi = data.routeApi;
        this.id = data.id;
        this.nameSingular = data.nameSingular;
    }

    /**
     * Initialize form.
     */
    onCreateForm() {
        this.createForm({
            name: null,
            email: null,
            login: null,
            password: null,
            status: false,
            master: true
        });
    }
}
