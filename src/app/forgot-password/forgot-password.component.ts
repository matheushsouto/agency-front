import {Component, Inject, Injector} from '@angular/core';
import {BaseManageComponent} from '../base/base-manage.component';
import {Route} from '../app-const';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent extends BaseManageComponent {
    routeApi = Route.USER_RECOVER_PASSWORD;

    constructor(@Inject(Injector) injector: Injector, private router: Router) {
        super(injector);
    }

    /**
     * Create form
     */
    onCreateForm() {
        this.createForm({
            field: null,
            type: null
        });
    }

    onBeforeFormSubmit(formValue) {
        formValue.type = formValue.field.match(/@/);
        return formValue;
    }

    sendMail() {
        const field = this.form.value.field;
        const type = this.form.value.type;

        if (field.match(/@/)) {
            this.form.get('type').patchValue('email');
        } else {
            this.form.get('type').patchValue('phone');
        }
        this.sharedService.save(Route.USER_RECOVER_PASSWORD, this.form.value).subscribe(res => {
            this.showSuccess('Sucesso!', 'Por favor, verifique sua caixa de email ou seu whatsapp.');
            this.router.navigate(['']);
        });
    }

    sendMessage() {

    }
}
