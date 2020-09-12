import {Component, Inject, Injector} from '@angular/core';
import {BaseManageComponent} from '../../../base/base-manage.component';
import {FormControl, Validators} from '@angular/forms';
import {emailValidator} from '../../../_helpers/app-validators';
import {CommonService} from '../../../_services';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent extends BaseManageComponent {
    routeApi = 'user/profile';
    user = this.userService.user;
    logo = this.user.logo;
    formData = true;
    updateWithoutId = true;

    constructor(@Inject(Injector) injector: Injector) {
        super(injector);
    }

    /**
     * Create form
     */
    onCreateForm() {
        this.createForm({
            name: new FormControl(this.user.name),
            email: new FormControl(this.user.email, Validators.compose([emailValidator])),
            phone: new FormControl(this.user.phone),
            login: new FormControl(this.user.login),
            logo: [],
        });
    }

    /**
     * File change
     *
     * @param event
     */
    onFileChange(event) {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            this.getFormField('logo').setValue(file);
            CommonService.getBase64(file).then((res) => {
                this.logo = res.toString();
            });
        }
    }

    /**
     * After Submit data
     *
     * @param response
     */
    onAfterFormSubmit(response) {
        const user = this.userService.user;
        user.logo = response.logo;
        user.name = response.name;
        user.email = response.email;
        user.phone = response.phone;
        user.login = response.login;
        this.userService.setUser(user);
    }
}
