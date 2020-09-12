import {Component} from '@angular/core';
import {ThemeService} from '../../_services/theme.service';

@Component({
    selector: 'app-options',
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.scss']
})
export class OptionsComponent {
    public showOptions: boolean = false;

    constructor(private themeService: ThemeService) {
    }

    public changeTheme(color: string) {
        this.themeService.setTheme({
            'bg': color,
            'menu-bg-clr': color,
            'menu-hover-bg': color,
            'clr': color === 'white' || color === '#FFFF00' ? 'black' : 'white'
        });
    }
}
