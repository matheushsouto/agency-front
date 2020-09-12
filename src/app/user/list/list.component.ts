import {Component, Inject, Injector} from '@angular/core';
import {ManageComponent} from '../manage/manage.component';
import {BaseListComponent} from '../../base/base-list.component';
import {CapabilityComponent} from '../capability/capability.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseListComponent {
    manageComponent = ManageComponent;
    namePlural = 'Usuários';
    nameSingular = 'Usuário';
    routeApi = this.route.USER;

    constructor(@Inject(Injector) injector: Injector) {
        super(injector);
    }

    /**
     * Get capability.
     */
    capability(id, name) {
        const dialogRef = this.modalDialog.open(CapabilityComponent, {
            data: {
                id: id,
                name: name
            },
            width: '700px'
        });

        dialogRef.afterClosed().subscribe(res => {
            // if (res) {
            //   this.all();
            // }
        });
    }
}
