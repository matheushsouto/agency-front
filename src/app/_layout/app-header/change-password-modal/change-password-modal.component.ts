import {Component, Inject, Injector, ViewEncapsulation} from '@angular/core';
import {BaseManageComponent} from '../../../base/base-manage.component';
import {Route} from '../../../app-const';
import {matchingPasswords} from '../../../_helpers/app-validators';

@Component({
    selector: 'app-change-password-modal',
    templateUrl: './change-password-modal.component.html',
    styleUrls: ['./change-password-modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ChangePasswordModalComponent extends BaseManageComponent {
    routeApi = Route.USER + '/password';
    updateWithoutId = true;

    constructor(@Inject(Injector) injector: Injector) {
        super(injector);
    }

    /**
     * Create form
     */
    onCreateForm() {
        this.createForm({
            current_password: [],
            new_password: [],
            confirm_new_password: [],
        }, {
            validator: matchingPasswords('new_password', 'confirm_new_password')
        });
    }
}
