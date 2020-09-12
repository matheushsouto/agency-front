import {Component, Inject, Injector, ViewEncapsulation} from '@angular/core';
import {BaseManageComponent} from '../../../base/base-manage.component';
import {Route} from '../../../app-const';
import {matchingPasswords} from '../../../_helpers/app-validators';

@Component({
    selector: 'app-change-password-modal',
    templateUrl: './change-password-temporary-modal.component.html',
    styleUrls: ['./change-password-temporary-modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ChangePasswordTemporaryModalComponent extends BaseManageComponent {
    routeApi = Route.USER + '/password-temporary';
    updateWithoutId = true;

    constructor(@Inject(Injector) injector: Injector) {
        super(injector);
    }

    /**
     * Create form
     */
    onCreateForm() {
        this.createForm({
            new_password: [],
            confirm_new_password: [],
        }, {
            validator: matchingPasswords('new_password', 'confirm_new_password')
        });
    }

    onAfterFormSubmit(response) {
        const user = this.userService.user;
        user.temporary_password = false;
        this.userService.setUser(user);
    }
}
