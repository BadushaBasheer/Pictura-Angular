// src/app/google-charts.service.ts
import { Injectable } from '@angular/core';

declare var google: any;

@Injectable({
    providedIn: 'root',
})
export class GoogleChartsService {
    private isLoaded = false;

    constructor() {
        google.charts.load('current', {
            packages: ['geochart'],
            mapsApiKey: 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY',
        });
    }

    public load(callback: () => void) {
        if (!this.isLoaded) {
            google.charts.setOnLoadCallback(() => {
                this.isLoaded = true;
                callback();
            });
        } else {
            callback();
        }
    }
}
