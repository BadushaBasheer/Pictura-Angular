import {Component} from '@angular/core';

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styles: [`
        .mat-accordion .mat-expansion-panel {
            color: white !important;
            background-color: black !important;
            border: 1px solid white !important;
        }
        .mat-accordion .mat-expansion-panel-header .mat-expansion-panel-header-title {
            color: white !important;
        }

    `]
})
export class SettingsComponent {
    isPrivate: boolean = true;

    togglePrivacy() {
        console.log('Account privacy toggled:', this.isPrivate);
    }
}
