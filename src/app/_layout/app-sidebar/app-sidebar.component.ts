import {Component, Inject, Injector, OnInit} from '@angular/core';

import {CommonService, UserService} from 'src/app/_services';
import {environment} from '../../../environments/environment';

import {CapabilityService} from '../../_services/capability.service';
import {EventType, Route} from '../../app-const';
import {BaseListComponent} from '../../base/base-list.component';

@Component({
    selector: 'app-sidebar',
    templateUrl: './app-sidebar.component.html',
    styleUrls: ['./app-sidebar.component.scss']
})
export class AppSidebarComponent extends BaseListComponent implements OnInit {

    menu: { isMini: boolean } = {isMini: true};
    environment = environment;
    config: any = '';
    capabilityService = CapabilityService;
    route = Route;
    user: any = {};
    logoClient;
    state;

    constructor(@Inject(Injector) injector: Injector, private commonService: CommonService) {
        super(injector);
        this.logoClient = this.userService.user.logo_client;
    }

    ngOnInit() {
        this.menu = this.commonService.menu;
    }

}
