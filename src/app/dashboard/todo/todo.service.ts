import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class TodoService {

    constructor(private http: HttpClient) {
    }

}
