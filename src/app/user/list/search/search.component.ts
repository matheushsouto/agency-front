import {Component, Inject, Injector} from '@angular/core';
import {BaseSearchComponent} from '../../../base/base-search.component';
import {Route} from '../../../app-const';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})

export class SearchComponent extends BaseSearchComponent {
    routeApi = Route.USER;

    constructor(@Inject(Injector) injector: Injector) {
        super(injector);
    }

    /**
     * Initialize form.
     * @param filters
     */
    onCreateForm(filters) {
        this.createForm(
            {
                'name ILIKE': filters['name ILIKE'] || '',
            }
        );
    }
}
