import {Component} from '@angular/core';
import {UserService} from '../_services';
import {Permission} from '../app-const';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    user = null;
    connectWhats;
    permissionId;

    constructor(userService: UserService) {
        this.user = userService.user;
        this.permissionId = this.user.permission_id;
        this.connectWhats = this.permissionId === Permission.PARTNER_CLIENT && !this.user.connected_whats;
    }
}
