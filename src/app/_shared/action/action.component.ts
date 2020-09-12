import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CapabilityService} from '../../_services/capability.service';

@Component({
    selector: 'app-action',
    templateUrl: './action.component.html',
    styleUrls: ['./action.component.scss'],
})
export class ActionComponent implements OnInit {
    @Output() eventEmitter: EventEmitter<any> = new EventEmitter();
    @Input() routeApi;
    @Input() namePlural;

    canAdd = false;
    canUpdate = false;
    canDelete = false;

    emit(method: string, value = null) {
        this.eventEmitter.emit({method: method, value: value});
    }

    ngOnInit() {
        this.checkPermission();
    }

    checkPermission() {
        const capability = CapabilityService.get(this.routeApi);
        this.canAdd = capability['write'];
        this.canUpdate = capability['write'];
        this.canDelete = capability['delete'];
    }
}
