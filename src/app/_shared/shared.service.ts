import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrderService} from '../_services/order.service';
import {FilterService} from '../_services/filter.service';

@Injectable({
    providedIn: 'root'
})

export class SharedService {
    constructor(private httpService: HttpClient) {
    }

    all(route): Observable<any> {
        const sort = OrderService.get(route);
        const filters = FilterService.mount(route);
        return this.allCustomize(route, sort['limit'], sort['page'], filters, sort['sort']);
    }

    allCustomize(route, limit = null, page: any = '0', filters = '', sort = 'id asc'): Observable<any> {

        return this.httpService.get(`${route}?page=${page}&limit=${limit}&sort=${sort}&${filters}`);
    }

    get(route, id): Observable<any> {
        return this.httpService.get(`${route}/${id}`);
    }

    getWithoutId(route): Observable<any> {
        return this.httpService.get(`${route}`);
    }

    create(route, data): Observable<any> {
        const sort = OrderService.get(route);
        const filters = FilterService.mount(route);
        return this.httpService.post(`${route}?index=true&page=${sort['page']}&limit=${sort['limit']}&sort=${sort['sort']}&${filters}`, data);
    }

    contains(table, field, value) {
        return this.httpService.get(`utility/contains/${table}/${field}/${value}`);
    }

    update(route, id, data, returnIndex): Observable<any> {
        const sort = OrderService.get(route);
        const filters = FilterService.mount(route);
        let routeApi = `${route}/${id}`;

        if (returnIndex) {
            routeApi += `?index=true&page=${sort['page']}&limit=${sort['limit']}&sort=${sort['sort']}&${filters}`;
        }
        return this.httpService.put(routeApi, data);
    }

    updateWithoutId(route, data, returnIndex): Observable<any> {
        const sort = OrderService.get(route);
        const filters = FilterService.mount(route);

        let routeApi = `${route}`;

        if (returnIndex) {
            routeApi += `?index=true&page=${sort['page']}&limit=${sort['limit']}&sort=${sort['sort']}&${filters}`;
        }

        return this.httpService.put(routeApi, data);
    }

    updateWithoutIdPost(route, data, returnIndex): Observable<any> {
        const sort = OrderService.get(route);
        const filters = FilterService.mount(route);

        let routeApi = `${route}`;

        if (returnIndex) {
            routeApi += `?index=true&page=${sort['page']}&limit=${sort['limit']}&sort=${sort['sort']}&${filters}`;
        }

        return this.httpService.post(routeApi, data);
    }

    save(route, data, id = null, updateWithoutId = false, formData = false, returnIndex = true) {
        if (updateWithoutId && formData) {
            return this.updateWithoutIdPost(route, data, returnIndex);
        }

        if (updateWithoutId) {
            return this.updateWithoutId(route, data, returnIndex);
        }
        if (id) {
            return this.update(route, id, data, returnIndex);
        }
        return this.create(route, data);
    }

    updateArray(route, data): Observable<any> {
        const sort = OrderService.get(route);
        const filters = FilterService.mount(route);

        return this.httpService.post(`${route}/bulk?index=true&page=${sort['page']}&limit=${sort['limit']}&sort=${sort['sort']}&${filters}`, data);
    }

    deleteArray(route, data): Observable<any> {
        const sort = OrderService.get(route);
        const filters = FilterService.mount(route);
        const routeApi = `${route}/bulk?index=true&page=${sort['page']}&limit=${sort['limit']}&sort=${sort['sort']}&${filters}`;

        return this.httpService.request('delete', routeApi, {body: data});
    }

    deleteItem(route, data): Observable<any> {
        const routeApi = `${route}`;
        return this.httpService.request('delete', routeApi, {body: data});
    }

    convertDateToSave(date) {
        const array = date.split('-');
        return array[2] + '-' + array[1] + '-' + array[0];
    }
}
