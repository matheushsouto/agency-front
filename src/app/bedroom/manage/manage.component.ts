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

    states = [];
    cities = [];
    hotels = [];
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
        this.sharedService.allCustomize(Route.UTILITY_STATE)
            .subscribe(res => {
                this.states = res;
            });
        this.getHotels();
    }

    /**
     * Initialize form.
     */
    onCreateForm() {
        this.createForm({
            name: null,
            count_bed: null,
            count_people: null,
            hotel_id: null,
            city_id: null,
            state_id: null
        });
    }

    /**
     * Get cities of a state.
     */
    getCities(cityId = null) {
        const stateId = this.getFormField('state_id').value;

        this.sharedService.get(Route.UTILITY_STATE_CITY, stateId)
            .subscribe(res => {
                this.cities = res;
                if (cityId) {
                    this.getFormField('city_id').setValue(cityId.toString());
                }
            });
    }

    /**
     * Get Hotels.
     */
    getHotels() {
        this.sharedService.allCustomize(Route.BOOKING_HOTEL, '', '').subscribe(resp => {
            console.log(resp.data);
            this.hotels = resp.data;
        });
    }

    /**
     * After search data
     *
     * @param response
     */
    onAfterSearch(response) {
        this.form.get('state_id').setValue(response.city.state.id.toString());
        this.getCities(response.city.id);
    }

    onAfterFormSubmit(response) {
        this.emitEvent(EventType.BOOKING_BEDROOM, response);
    }
}
