import {Injectable} from '@angular/core';

interface Theme {
    'bg': string;
    'menu-bg-clr': string;
    'menu-hover-bg': string;
    'clr': string;
}

@Injectable({providedIn: 'root'})
export class ThemeService {

    setTheme(theme: Theme) {
        Object.keys(theme).forEach(k =>
            document.documentElement.style.setProperty(`--${k}`, theme[k])
        );
    }
}
