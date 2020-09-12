import {Inject, Injectable, Injector, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from '../_services/order.service';
import {Route} from '../app-const';
import {SharedService} from '../_shared/shared.service';
import {CapabilityService} from '../_services/capability.service';
import {HintService} from '../_services/hint.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {ConfirmModalComponent} from '../_shared/confirm-modal/confirm-modal.component';
import {EventEmitterService} from '../_services/event-emitter.service';
import {Subscription} from 'rxjs';
import {UserService} from '../_services';

@Injectable()
export abstract class BaseListComponent implements OnInit, OnDestroy {
    routeApi = '';
    manageComponent: any;
    nameSingular: string;
    route = Route;
    items: any[] = [];
    selected = [];
    selectedItem = [];
    pageInfo: any = {
        count: 0,
        page: 1,
        offset: 0,
        pagePartner: 10,
        pageSize: 10
    };
    canAdd: boolean;
    canUpdate: boolean;
    canDelete: boolean;
    dialogRef;
    private events: Array<Subscription> = [];

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
     * Create class shared service
     *
     * return ToastrService
     */
    get sharedService(): SharedService {
        return this.injector.get(SharedService);
    }

    get modalDialog(): MatDialog {
        return this.injector.get(MatDialog);
    }

    /**
     * Create class toastrService service
     *
     * return toastrService
     */
    private get toastrService(): ToastrService {
        return this.injector.get(ToastrService);
    }

    /**
     * Create class router service
     *
     * return Router
     */
    private get routerService(): Router {
        return this.injector.get(Router);
    }

    /**
     * Calls when the modules were loaded
     */
    ngOnInit() {
        this.onInit();
        this.checkPermission(this.routeApi);
    }

    showHints() {
        const route = this.routerService.url;
        setTimeout(function () {
            const steps = [];
            if (steps.length > 0) {
                HintService.show(steps);
            }
        }, 100);
    }

    checkPermission(route: string) {
        const listRouteCan = ['user/qr-code'];

        if (route && listRouteCan.indexOf(route) === -1) {

            const capability = CapabilityService.get(route);
            this.canAdd = capability['write'];
            this.canUpdate = capability['write'];
            this.canDelete = capability['delete'];
        }
    }

    /**
     * Set page order.
     *
     * @param pageInfo
     */
    setPage(pageInfo) {
        this.pageInfo.offset = pageInfo.offset * pageInfo.pagePartner;
        this.pageInfo.page = pageInfo.offset + 1;

        OrderService.saveItem(this.routeApi, 'page', this.pageInfo.page);
        this.all();
    }

    setLimit(limit = null) {
        OrderService.saveItem(this.routeApi, 'limit', limit);
    }

    /**
     * Set items and adding to the array.
     * @param selected
     */
    onSelect({selected}) {
        if (selected.length > 0) {
            this.selectedItem = [];
            selected.forEach((selectedEle) => {
                this.selectedItem.push(selectedEle.id);
            });
        } else {
            this.selectedItem = [];
        }
    }

    /**
     * Set order.
     * @param sort
     */
    onSort(sort) {
        OrderService.saveItem(this.routeApi, 'sort', (sort.prop + ' ' + sort.dir));
        this.all();
    }

    onBeforeInitialize(items) {
    }

    /**
     * Initialize variables that are called several times.
     */
    initializeFields(response) {
        this.selected = [];
        this.items = response.length > 0 ? response : response.data;

        if (!this.items) {
            this.items = [];
        }
        this.onBeforeInitialize(this.items);
        this.pageInfo.count = response ? response.total : 0;
        this.selectedItem = [];
    }

    /**
     * Method to calls when the modules were loaded
     */
    onInit() {
        this.all();
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

    onAfterAll(res) {
    }

    /**
     * Return all.
     */
    all() {
        this.sharedService.all(
            this.routeApi
        )
            .subscribe(
                (res: any) => {
                    this.initializeFields(res);
                    this.onAfterAll(res);
                    this.showHints();
                },
                () => {
                    this.showError('Erro', 'Ocorreu um problema ao buscar os dados.' +
                        ' Verifique sua conexão com a internet e tente novamente.');
                }
            );
    }

    /**
     * Process result event.
     *
     * @param event
     */
    processResult(event) {
        switch (event.method) {
            case 'manage':
                this.manage();
                break;
            case 'delete':
                this.delete();
                break;
            case 'changeStatus':
                this.changeStatus(event.value);
        }
    }

    /**
     * Displaying modal of manage.
     *
     * @param id
     * @param data
     */
    manage(id: number = null, data: object = {}) {
        const dialogRef = this.modalDialog.open(this.manageComponent, {
            data: {
                id: id,
                routeApi: this.routeApi,
                nameSingular: this.nameSingular,
                data: data
            },
            width: '700px'
        });

        dialogRef.afterClosed()
            .subscribe(res => {
                if (res) {
                    //   this.all();
                    this.initializeFields(res);
                }
            });
    }

    /**
     * Printing view.
     */
    print() {
        window.print();
    }

    openModalDialog(data, modal, height = '350px', width = '600px') {
        this.dialogRef = this.modalDialog.open(modal, {
            data: data,
            width: width,
            height: height,
            id: data
        });
    }

    closeModalDialog() {
        this.modalDialog.closeAll();
    }

    /**
     * Set status.
     */
    changeStatus(status, id = null) {
        if (id) {
            this.selectedItem = [];
            this.selectedItem.push(id);
        }
        if (this.selectedItem.length) {

            const data = {};
            this.selectedItem.forEach(key => {
                data[key] = {status: status};
            });

            this.sharedService.updateArray(
                this.routeApi,
                {data: data}
            )
                .subscribe((res: any) => {
                        this.initializeFields(res);
                        this.showSuccess('Sucesso', 'Atualizado com sucesso.');
                    },
                    () => {
                        this.showError('erro', 'Ocorreu um erro ao atualizar os dados.' +
                            ' Verifique sua conexão com a internet e tente novamente.');
                    }
                );
        } else {
            this.showInfo('Aviso', 'Nenhum um item selecionado');
        }
    }

    /**
     * Delete Bots.
     */
    delete() {
        if (this.selectedItem && this.selectedItem.length) {
            const dialogRef = this.modalDialog.open(ConfirmModalComponent, {
                data: {
                    title: 'Atenção',
                    message: `Tem certeza que deseja deletar?`
                },
                width: '700px'
            });

            dialogRef.afterClosed().subscribe(res => {
                if (res) {
                    if (res) {
                        this.sharedService
                            .deleteArray(
                                this.routeApi,
                                {
                                    ids: this.selectedItem,
                                })
                            .subscribe(
                                (delRes: any) => {
                                    this.initializeFields(delRes);
                                    if (delRes) {
                                        this.showSuccess('Sucesso', 'Deletado com sucesso.');
                                    }
                                },
                                () => {
                                    this.showError('Erro', 'Ocorreu um problema ao deletar. ' +
                                        'Verifique sua conexão com a internet e tente novamente.');
                                }
                            );
                    }
                }
            });
        } else {
            this.showInfo('Aviso', 'Nenhum um item selecionado.');
        }
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

    emitEvent(event, value) {
        EventEmitterService.get(event).emit(value);
    }

    ngOnDestroy() {
        this.events.forEach(event => {
            event.unsubscribe();
        });
    }
}

