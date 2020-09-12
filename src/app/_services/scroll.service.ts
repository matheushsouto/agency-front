import {Injectable} from '@angular/core';
import * as $ from 'jquery';

@Injectable({
    providedIn: 'root'
})
export class ScrollService {

    scroll(elementId, value = null) {
        $(function () {
            const sc = document.getElementById(elementId);
            sc.scrollTop = value || sc.scrollHeight;
        });
    }

    getHeight(elementId) {
        let height = 0;
        const sc = document.getElementById(elementId);
        height = sc.scrollHeight;
        return height;
    }
}
