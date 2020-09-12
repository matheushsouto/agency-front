import {Component, EventEmitter, Inject, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {CommonService} from 'src/app/_services/';
import {SharedService} from '../../_shared/shared.service';
import {Route} from '../../app-const';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'app-manage',
    templateUrl: './capability.component.html',
    styleUrls: ['./capability.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class CapabilityComponent implements OnInit {
    @Output() response: EventEmitter<boolean> = new EventEmitter();
    displayedColumns: string[] = ['module', 'read', 'write', 'delete'];
    modules: MatTableDataSource<any>;
    modulesUser = [];
    id: bigint = null;
    name: string = null;

    constructor(
        private commonService: CommonService,
        private sharedService: SharedService,
        private matDialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data
    ) {
    }

    /**
     * After loading component.
     */
    ngOnInit() {
        this.sharedService.get(Route.USER_MODULE, this.data.id).subscribe(
            (res: any) => {
                this.all();
                this.modulesUser = res;
            },
            () => {
                this.commonService.showError('Erro', 'Erro ao buscar os módulos do usuário');
            }
        );
    }

    /**
     * Close modal.
     */
    close() {
        this.matDialog.closeAll();
    }

    /**
     * Get module user.
     */
    getModuleUser(slug): object {
        let module = null;
        this.modulesUser.forEach((moduleUser) => {
            if (slug === moduleUser.slug) {
                module = moduleUser;
            }
        });
        return module;
    }

    /**
     * Update or create permission user.
     */
    updateOrCreate(row, field) {
        row.capability[field] = !row.capability[field];
        this.sharedService.save(
            Route.USER_MODULE_USER,
            row.capability
        )
            .subscribe(() => {
                },
                (err) => {
                    row.capability[field] = !row.capability[field];
                    this.commonService.showError('Erro', 'Há algum problema em alterar a permissão.');
                }
            );
    }

    /**
     * Return all modules of users.
     */
    private all() {
        this.sharedService.allCustomize(
            Route.USER_MODULE_PERMISSION
        )
            .subscribe(
                (res: any) => {
                    const modules = [];
                    res.forEach((module) => {
                        const moduleUser = this.getModuleUser(module.slug);

                        if (!moduleUser) {
                            module['capability'] = {module_id: module.id, user_id: this.data.id, read: false, write: false, delete: false};
                        }
                        modules.push(moduleUser || module);
                    });
                    this.modules = new MatTableDataSource(modules);
                },
                (err) => {
                    this.commonService.showError('Erro', 'Há algum problema em obter os módulos dos usuários.');
                }
            );
    }
}
