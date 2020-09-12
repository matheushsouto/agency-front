import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import { CommonService, UserService} from '../_services';
import {CapabilityService} from '../_services/capability.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private userService: UserService,
        private  commonService: CommonService
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        const user = this.userService.user;

        // if (user.temporary_password && state.url !== '/admin/dashboard') {
        //     this.router.navigate(['/admin/dashboard']);
        // }

        if (user && (Object.keys(next.data).length === 0)) {
            return true;
        }

        if (!CapabilityService.hasPermission(next.data.slug)) {
            this.router.navigate(['/admin/dashboard']);
            this.commonService.showError('Atenção', 'Você não possui permissão para acessar esta rota.');
            return false;
        }

        return true;
    }
}
