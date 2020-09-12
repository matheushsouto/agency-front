import {Component, Inject, Injector} from '@angular/core';
import {Route} from '../../../app-const';
import {BaseSearchComponent} from '../../../base/base-search.component';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})

export class SearchComponent extends BaseSearchComponent {
    routeApi = Route.PERSONA_AGENT;

    constructor(@Inject(Injector) injector: Injector) {
        super(injector);
    }

    /**
     * Initialize form.
     * @param filter
     */
    onCreateForm(filters) {
        this.createForm(
            {
                'name LIKE': filters['name LIKE'] || '',
                'email LIKE': filters['email LIKE'] || '',
                'cpf =': filters['cpf LIKE'] || '',
            }
        );
    }
}
