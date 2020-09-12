import {Component, Inject, Injector} from '@angular/core';
import {ManageComponent} from '../manage/manage.component';
import {BaseListComponent} from '../../base/base-list.component';
import {SharedService} from '../../_shared/shared.service';
import {EventType} from '../../app-const';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseListComponent {
    manageComponent = ManageComponent;
    namePlural = 'Agentes de Viagens';
    nameSingular = 'Agente de Viagem';
    routeApi = this.route.PERSONA_AGENT;

    constructor(@Inject(Injector) injector: Injector, sharedService: SharedService) {
        super(injector);
        this.addEvent(EventType.PERSONA_AGENT);
    }

    onEvents(event: String, data: any) {
        this.all();
    }
}
