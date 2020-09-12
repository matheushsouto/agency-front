import {Component, Inject, Injector} from '@angular/core';
import {ManageComponent} from '../manage/manage.component';
import {BaseListComponent} from '../../base/base-list.component';
import {SharedService} from '../../_shared/shared.service';
import {EventType, Route} from '../../app-const';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseListComponent {
    manageComponent = ManageComponent;
    namePlural = 'Quartos';
    nameSingular = 'Quarto';
    routeApi = this.route.BOOKING_BEDROOM;

    constructor(@Inject(Injector) injector: Injector, sharedService: SharedService) {
        super(injector);
        this.addEvent(EventType.BOOKING_BEDROOM);
    }

    onEvents(event: String, data: any) {
        this.all();
    }
}
