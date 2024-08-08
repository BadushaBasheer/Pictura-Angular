import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GoogleChartsService} from "../../services/google-charts.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

declare const google: any;

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styles: []
})
export class DashboardComponent implements OnInit {

    isSmallScreen!: boolean;


    @ViewChild('chartContainer', {static: true}) chartContainer!: ElementRef;


    constructor(private googleChartsService: GoogleChartsService,
                private breakpointObserver: BreakpointObserver) {
        this.breakpointObserver.observe([
            Breakpoints.Handset
        ]).subscribe(result => {
            this.isSmallScreen = result.matches;
        });
    }

    ngOnInit() {
        this.googleChartsService.load(this.drawChart.bind(this));
    }

    private drawChart() {
        const data = google.visualization.arrayToDataTable([
            ['State', 'Value'],
            ['Maharashtra', 1],
            ['Gujarat', 2],
            ['Rajasthan', 3],
            ['West Bengal', 4],
            ['Uttar Pradesh', 5],
            ['Punjab', 6],
            ['Tamil Nadu', 7],
            ['Karnataka', 8],
            ['Kerala', 9],
            ['Delhi', 10],
            ['Bihar', 11],
            ['Madhya Pradesh', 12],
            ['Haryana', 13],
            ['Andhra Pradesh', 14],
            ['Assam', 15],
            ['Jharkhand', 16],
            ['Odisha', 17],
            ['Chhattisgarh', 18],
            ['Telangana', 19],
            ['Uttarakhand', 20],
            ['Himachal Pradesh', 21],
            ['Tripura', 22],
            ['Meghalaya', 23],
            ['Manipur', 24],
            ['Nagaland', 25],
            ['Goa', 26],
            ['Arunachal Pradesh', 27],
            ['Mizoram', 28],
            ['Sikkim', 29],
            ['Puducherry', 30],
            ['Chandigarh', 31],
            ['Andaman and Nicobar Islands', 32],
            ['Dadra and Nagar Haveli and Daman and Diu', 33],
            ['Lakshadweep', 34]
        ]);

        const options = {
            region: 'IN', // India
            resolution: 'provinces',
            colorAxis: {colors: ['#00853f', 'black', '#e31b23']},
            backgroundColor: '#81d4fa',
            datalessRegionColor: '#d51d04',
            defaultColor: '#f5f5f5',
        };

        const chart = new google.visualization.GeoChart(this.chartContainer.nativeElement);
        chart.draw(data, options);
    }



}
