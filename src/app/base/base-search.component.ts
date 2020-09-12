import {FormBuilder, FormGroup} from '@angular/forms';
import {EventEmitter, Inject, Injectable, Injector, Input, OnInit, Output} from '@angular/core';
import {FilterService} from '../_services/filter.service';
import {UserService} from '../_services';

@Injectable()
export abstract class BaseSearchComponent implements OnInit {
    @Output() groupFilters: EventEmitter<boolean> = new EventEmitter();
    @Input() routeApi = '';
    form: FormGroup;

    protected constructor(@Inject(Injector) private injector: Injector) {
    }

    /**
     * Create class User service
     *
     * return UserService
     */
    get userService(): UserService {
        return this.injector.get(UserService);
    }

    /**
     * Calls when the modules were loaded
     */
    ngOnInit() {
        this.onInit();
        const filters = FilterService.get(this.routeApi);
        this.onCreateForm(filters);
    }

    /**
     * Create a new field to the form
     *
     * @param controlsConfig
     * @param options
     */
    createForm(controlsConfig, options = null) {
        this.form = new FormBuilder().group(controlsConfig, options);
    }

    /**
     * Create a new field to the form
     *
     * @param value
     */
    resetForm(value) {
        this.form.reset(value);
    }

    /**
     * Emit a event
     *
     * @param value
     */
    emit(value = null) {
        this.groupFilters.emit(value);
    }

    /**
     * Search data
     */
    onSearch() {
        const valueForm = this.form.value;
        Object.keys(valueForm).forEach(key => valueForm[key] === '' || valueForm[key] == null ? delete valueForm[key] : key);
        FilterService.save(this.routeApi, valueForm);
        this.emit(valueForm);
    }

    /**
     * Clear filter
     */
    public onClear(): void {
        this.form.reset();
        FilterService.delete(this.routeApi);
        this.emit();
    }

    /**
     * Method to calls when the modules were loaded
     */
    onInit() {
    }

    /**
     * Abstract method to create form
     */
    abstract onCreateForm(filters): void;
}
