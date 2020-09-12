import {Component, Inject, Injector} from '@angular/core';
import {Route} from '../app-const';
import {BaseManageComponent} from '../base/base-manage.component';
import {Router} from '@angular/router';
import {CapabilityService} from '../_services/capability.service';
import {TutorialService} from '../_services/tutorial.service';
import {EventEmitterService} from '../_services/event-emitter.service';

@Component({
    selector: 'app-manage',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseManageComponent {
    routeApi = Route.LOGIN;

    constructor(@Inject(Injector) injector: Injector, private router: Router) {
        super(injector);
    }

    /**
     * Calls when the modules were loaded
     */
    onInit() {
        this.msgSuccess = {title: 'Sucesso', msg: 'Login realizado com sucesso', show: true};
        this.msgError = {title: 'Erro', msg: 'Login ou senha inválidos', show: true};
    }

    /**
     * Initialize form.
     */
    onCreateForm() {
        this.createForm({
            login: null,
            password: null,
        });
    }

    /**
     * After Submit data
     *
     * @param res
     */
    onAfterFormSubmit(res) {
        this.userService.setUser(res);
        CapabilityService.save(res.capabilities);
        this.router.navigate(['/admin']);
    }
}
