import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {Inject, Injectable, Injector, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {SharedService} from '../_shared/shared.service';
import {UserService} from '../_services';
import {Table} from '../app-const';
import {MatDialogRef} from '@angular/material/dialog';
import {EventEmitterService} from '../_services/event-emitter.service';
import {Subscription} from 'rxjs';

@Injectable()
export abstract class BaseManageComponent implements OnInit, OnDestroy {
    form: FormGroup;
    private events: Array<Subscription> = [];
    data: any;
    updateWithoutId = false;
    formData = false;
    resetValuesForm = true;
    table = Table;
    id = null;
    nameSingular: string;
    routeApi = '';
    returnIndex = true;
    msgSuccess = {title: 'Sucesso', msg: 'Salvo com sucesso ', show: true};
    msgError = {title: 'Ops', msg: 'Ocorreu um erro. Tente novamente', show: true};
    emitResponse = true;

    constructor(@Inject(Injector) private injector: Injector) {
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
     * Create class shared service
     *
     * return ToastrService
     */
    get sharedService(): SharedService {
        return this.injector.get(SharedService);
    }

    /**
     * Create class toast service
     *
     * return ToastrService
     */
    private get toastrService(): ToastrService {
        return this.injector.get(ToastrService);
    }

    /**
     * Create class toast service
     *
     * return ToastrService
     */
    private get matDialogRef(): MatDialogRef<any> {
        return this.injector.get(MatDialogRef);
    }

    /**
     * Calls when the modules were loaded
     */
    ngOnInit(): void {
        this.onInit();
        this.onCreateForm();
        this.onSearch();
    }

    /**
     * Checks if there is an error in a form field
     */
    hasError(field) {
        return this.form.controls[field].errors;
    }

    /**
     * Get form field
     */
    getFormField(field) {
        return this.form.controls[field];
    }

    /**
     * Get message error in a form field
     */
    getMessageError(field) {
        let msg = '';

        Object.keys(this.form.controls[field].errors).forEach(key => {
            switch (key) {
                case 'required': {
                    msg = 'O campo é obrigatório.';
                    break;
                }
                case 'minlength': {
                    // const index = this.findIndexByObject(this.form.controls, field);
                    // const inputForm = document.querySelector('input[id="mat-input-' + index + '"]');
                    // const typeInput = inputForm.getAttribute('type');
                    const requireLength = this.form.controls[field].getError(key).requiredLength;

                    msg = 'O campo deve possuir no mínimo ' + requireLength + ' caracteres.';
                    break;
                }
                case 'maxlength': {
                    const requireLength = this.form.controls[field].getError(key).requiredLength;
                    msg = 'O campo deve possuir no máximo ' + requireLength + ' caracteres.';
                    break;
                }
                case 'errorApi': {
                    msg = this.form.controls[field].getError(key);
                    break;
                }
                case 'confirmedValidator': {
                    msg = 'Os campos devem corresponder.';
                    break;
                }
                case 'cnpjValidator': {
                    msg = 'CNPJ inválido.';
                    break;
                }
                case 'invalidEmail': {
                    msg = 'Email inválido.';
                    break;
                }
                case 'contains': {
                    msg = 'Este campo precisa conter outro valor, pois este se encontra indisponível.';
                    break;
                }
                case 'withoutInternet': {
                    msg = 'Verifique sua conexão com a internet e tente novamente.';
                    break;
                }
                case 'noContainsWhatsApp': {
                    msg = 'Telefone não encontrado no WhatsApp.';
                    break;
                }
            }
        });
        return msg;
    }

    /**
     * Checks if there is an error in a form field
     */
    getError(field, error = 'errorApi'): string {
        return this.form.controls[field].getError(error);
    }

    /**
     * Add a new field to the form
     *
     * @param name
     * @param abstractControl
     */
    addControl(name, abstractControl: AbstractControl = null) {
        this.form.addControl(name, abstractControl);
    }

    /**
     * Remove a new field to the form
     *
     * @param name
     */
    removeControl(name) {
        this.form.removeControl(name);
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
    resetForm(value = {}) {
        this.form.reset(value);
    }

    /**
     * Return is valid form
     *
     * @return boolean
     */
    isValidForm(): Boolean {
        return this.form.valid;
    }

    /**
     * Emit a response
     *
     * @param value
     */
    emit(value = null) {
        try {
            this.matDialogRef.close(value);
        } catch (e) {
        }
    }

    /**
     * Return isn´t valid form
     *
     * @return boolean
     */
    isInvalidForm(): Boolean {
        return this.form.invalid;
    }

    /**
     * Show toast success
     *
     * @param title
     * @param message
     */
    showSuccess(title, message) {
        this.toastrService.success(message, title);
    }

    /**
     * Show toast info
     *
     * @param title
     * @param message
     */
    showInfo(title, message) {
        this.toastrService.info(message, title);
    }

    /**
     * Show toast warning
     *
     * @param title
     * @param message
     */
    showWarning(title, message) {
        this.toastrService.warning(message, title);
    }

    /**
     * Show toast error
     *
     * @param title
     * @param message
     */
    showError(title, message) {
        this.toastrService.error(message, title);
    }

    /**
     * After search data
     *
     * @param response
     */
    onAfterSearch(response) {
    }

    /**
     * Search data
     */
    onSearch() {
        if (this.id) {
            this.sharedService.get(this.routeApi, this.id).subscribe(
                (res: any) => {
                    this.form.reset(res);
                    this.data = res;
                    this.onAfterSearch(res);
                },
                () => {
                    this.showError('Erro', 'Ocorreu um erro. Verifique sua conexão com a internet e tente novamente.');
                }
            );
        }
    }

    /**
     * After Submit data
     *
     * @param response
     */
    onAfterFormSubmit(response) {
    }

    onBeforeFormSubmit(formValue) {
        return formValue;
    }

    /**
     * After Submit data
     *
     * @param error
     */
    onAfterFormSubmitError(error) {
        if (error.status === 422) {
            const errors = error.error.errors;
            Object.keys(this.form.controls).forEach(key => {
                if (errors[key]) {
                    this.form.controls[key].setErrors({errorApi: errors[key]});
                }
            });
        } else {
            if (this.msgError.show) {
                this.showError(this.msgError.title, this.msgError.msg);
            }
        }
    }

    getFormValue() {
        return this.form.value;
    }

    /**
     * Submit data
     */
    onFormSubmit() {
        if (this.isInvalidForm()) {
            return false;
        }
        let formValue = this.getFormValue();
        if (this.formData) {
            const formData = new FormData();

            Object.keys(formValue).forEach(key => {
                formData.append(key, formValue[key]);
            });
            formValue = formData;
        }
        formValue = this.onBeforeFormSubmit(formValue);
        this.sharedService.save(this.routeApi, formValue, this.id, this.updateWithoutId, this.formData, this.returnIndex)
            .subscribe(
                (res) => {
                    if (this.resetValuesForm) {
                        this.resetForm();
                    }

                    if (this.emitResponse) {
                        this.emit(res);
                    }

                    if (this.msgSuccess.show) {
                        this.showSuccess(this.msgSuccess.title, this.msgSuccess.msg);
                    }

                    this.onAfterFormSubmit(res);
                },
                (error) => {
                    this.onAfterFormSubmitError(error);
                }
            );
    }

    /**
     * Checks if there is the same value saved in the database
     *
     * @param table
     * @param field
     * @param ignoreValue
     * @param validate
     */
    onContains(table, field, ignoreValue = null, validate = true) {
        const formField = this.getFormField(field);
        if (formField.invalid) {
            return;
        }

        if (ignoreValue && formField.value === ignoreValue) {
            return;
        }

        this.sharedService.contains(
            table,
            field,
            formField.value
        )
            .subscribe(
                (res: any) => {
                    this.onAfterContains(res);
                    if (res) {
                        if (validate) {
                            formField.setErrors({contains: true});
                        }
                    }
                },
                () => {
                    formField.setErrors({withoutInternet: true});
                }
            );
    }

    onAfterContains(res: boolean) {

    }

    /**
     * Find index array in a object
     *
     * @param object
     * @param key
     */
    findIndexByObject(object, key) {
        let index = -1;
        Object.keys(this.form.controls).forEach(function (keyObject, indexObject) {
            if (keyObject === key) {
                index = indexObject;
            }
        });
        return index;
    }

    /**
     * Events.
     */
    onEvents(event: String, data: any) {
    }

    /**
     * Get event.
     */
    addEvent(event) {
        const eventEmitter = EventEmitterService.get(event)
            .subscribe(data => {
                this.onEvents(event, data);
            });
        this.events.push(eventEmitter);
    }

    /**
     * Emit event.
     */
    emitEvent(event, value) {
        EventEmitterService.get(event).emit(value);
    }


    ngOnDestroy() {
        this.events.forEach(event => {
            event.unsubscribe();
        });
    }

    /**
     * Abstract method to when close
     */
    public onClose(): void {
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
    abstract onCreateForm(): void;
}
