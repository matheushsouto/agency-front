import {Component, Inject, Injector} from '@angular/core';
import {CommonService} from 'src/app/_services';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {ChangePasswordModalComponent} from './change-password-modal/change-password-modal.component';
import {Router} from '@angular/router';
import {BaseListComponent} from '../../base/base-list.component';
import {ChangePasswordTemporaryModalComponent} from './change-password-temporary-modal/change-password-temporary-modal.component';
import {EventType, Route} from '../../app-const';
import {CapabilityService} from '../../_services/capability.service';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent extends BaseListComponent {
    menu: { isMini: boolean } = {isMini: false};
    user: any = {};
    avatar = false;
    logoClient;
    state;
    capabilityService = CapabilityService;
    battery;
    plugged;

    constructor(
        private router: Router,
        private coreService: CommonService,
        @Inject(Injector) injector: Injector
    ) {
        super(injector);
        this.logoClient = this.user.logo_client;
    }

    onInit() {
        this.user = this.userService.user;

        if (this.user.temporary_password) {
            this.changePasswordTemporary();
        }
        this.menu = this.coreService.menu;
    }

    logout() {
        this.userService.deleteSession();
        this.coreService.navigateTo('');
    }

    toggleMenu() {
        this.menu.isMini = !this.menu.isMini;
        if (this.menu.isMini) {
            document.body.className = document.body.className.concat(' mini');
        } else {
            document.body.className = document.body.className.replace(' mini', '').replace('mini', '');
        }
    }

    editProfile() {
        const dialogRef = this.modalDialog.open(EditProfileComponent, {
            data: {
                id: '2',
                name: name
            },
            width: '700px'
        });
    }

    changePassword() {
        const dialogRef = this.modalDialog.open(ChangePasswordModalComponent, {
            data: {
                id: '2',
                name: name
            },
            width: '700px'
        });
    }

    changePasswordTemporary() {
        const dialogRef = this.modalDialog.open(ChangePasswordTemporaryModalComponent, {
            disableClose: true,
            data: {
                id: '2',
                name: name
            },
            width: '700px'
        });
    }

    openAvatar() {
        this.avatar = !this.avatar;
    }
}
