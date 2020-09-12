import {Component, ViewEncapsulation} from '@angular/core';
import {TodoService} from './todo.service';
import {Route} from '../../app-const';
import {SharedService} from '../../_shared/shared.service';
import {UserService} from '../../_services';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [TodoService]
})
export class TodoComponent {
    user: any;
    disabled;
    active;
    chartReady;
    transactions;

    public barChartLabels = [];
    public barChartType = 'bar';
    public barChartLegend = false;
    public barChartData = [{data: [], label: 'Falta'}];

    public doughnutChartLabels = ['Desativados', 'Ativos'];
    public doughnutChartData = [];
    public doughnutChartType = 'doughnut';

    public pieChartData: number[] = [300, 500, 100];
    public pieChartLabels: string[] = ['Deposito', 'Retirada', 'Transação'];
    public pieChartType = 'pie';
    public barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true
    };

    constructor(private _todoService: TodoService, private sharedService: SharedService) {
    }

}
