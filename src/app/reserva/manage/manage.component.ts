import {Component, Inject, Injector} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {cnpjValidator, cpfValidator, emailValidator} from '../../_helpers/app-validators';
import {BaseManageComponent} from '../../base/base-manage.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {EventType, Route} from '../../app-const';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss']
})
export class ManageComponent extends BaseManageComponent {

    hotels = [];
    bedrooms = [];
    guests = [];

    constructor(@Inject(Injector) injector: Injector, @Inject(MAT_DIALOG_DATA) public data) {
        super(injector);
        this.routeApi = data.routeApi;
        this.id = data.id;
        this.nameSingular = data.nameSingular;
    }


    /**
     * Calls when the modules were loaded
     */
    onInit() {
        this.getHotels();
        this.getBedrooms();
        this.getGuests();
    }

    /**
     * Initialize form.
     */
    onCreateForm() {
        this.createForm({
            date_reserva: null,
            bedroom_id: null,
            guest_id: null,
            hotel_id: null
        });
    }

    /**
     * Get Hotels.
     */
    getHotels() {
        this.sharedService.allCustomize(Route.BOOKING_HOTEL, '', '').subscribe(resp => {
            this.hotels = resp.data;
        });
    }

    getBedrooms() {
        this.sharedService.allCustomize(Route.BOOKING_BEDROOM, '', '').subscribe(resp => {
            this.bedrooms = resp.data;
        });
    }

    getGuests() {
        this.sharedService.allCustomize(Route.PERSONA_GUEST, '', '').subscribe(resp => {
            this.guests = resp.data;
        });
    }

    onAfterFormSubmit(response) {
        this.emitEvent(EventType.BOOKING_BEDROOM, response);
    }
}
