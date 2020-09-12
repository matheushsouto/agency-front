import {ThemeService} from './_services/theme.service';
import {UserService} from './_services';
import {Component} from '@angular/core';
import {Spinkit} from 'ng-http-loader';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public spinkit = Spinkit;
    constructor(private themeService: ThemeService, private userService: UserService) {
        this.themeService.setTheme({
            'bg': 'white',
            'menu-bg-clr': '#FFFAFA',
            'menu-hover-bg': '#DCDCDC',
            'clr': 'black'
        });
    }
}
