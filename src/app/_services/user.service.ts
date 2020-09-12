import {environment} from './../../environments/environment';
import {Injectable} from '@angular/core';
import {CapabilityService} from './capability.service';
import {OrderService} from './order.service';
import {TutorialService} from './tutorial.service';
import {FilterService} from './filter.service';
import {User} from '../_models/user';

@Injectable({providedIn: 'root'})
export class UserService {
    user: User = new User();

    constructor() {
        this.user = this.getUser();
    }

    getUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    setUser(res: any) {
        res.logo = res.logo ? environment.pathImg + res.logo : 'assets/images/edit-profile-pic.png';
        res.logo_client = res.logo_client ? environment.pathImg + res.logo_client : 'assets/images/edit-profile-pic.png';

        localStorage.setItem('user', JSON.stringify(res));
    }

    deleteSession() {
        CapabilityService.removeItem();
        OrderService.removeItem();
        FilterService.removeItem();
        this.user = null;

        localStorage.removeItem('user');
    }
}
