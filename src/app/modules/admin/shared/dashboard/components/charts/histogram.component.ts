import {Component, OnInit} from '@angular/core';

declare var google: any;

@Component({
  selector: 'histogram',
  template:`<div id="chart_div" ></div>`,
})
export class HistogramComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        this.loadChart();
    }

    loadChart(): void {
        google.charts.load('current', { packages: ['corechart', 'bar'] });
        google.charts.setOnLoadCallback(() => this.drawMultSeries());
    }

    drawMultSeries(): void {
        const data = new google.visualization.DataTable();
        data.addColumn('timeofday', 'Time of Day');
        data.addColumn('number', 'Motivation Level');
        data.addColumn('number', 'Energy Level');

        data.addRows([
            [{ v: [8, 0, 0], f: '8 am' }, 1, 0.25],
            [{ v: [9, 0, 0], f: '9 am' }, 2, 0.5],
            [{ v: [10, 0, 0], f: '10 am' }, 3, 1],
            [{ v: [11, 0, 0], f: '11 am' }, 4, 2.25],
            [{ v: [12, 0, 0], f: '12 pm' }, 5, 2.25],
            [{ v: [13, 0, 0], f: '1 pm' }, 6, 3],
            [{ v: [14, 0, 0], f: '2 pm' }, 7, 4],
            [{ v: [15, 0, 0], f: '3 pm' }, 8, 5.25],
            [{ v: [16, 0, 0], f: '4 pm' }, 9, 7.5],
            [{ v: [17, 0, 0], f: '5 pm' }, 10, 10],
        ]);

        const options = {
            title: 'Motivation and Energy Level Throughout the Day',
            backgroundColor: '#000000', // Black background
            titleTextStyle: { color: '#ffffff' }, // White title text
            hAxis: {
                title: 'Time of Day',
                format: 'h:mm a',
                viewWindow: {
                    min: [7, 30, 0],
                    max: [17, 30, 0]
                },
                textStyle: { color: '#ffffff' }, // White axis labels
            },
            vAxis: {
                title: 'Rating (scale of 1-10)',
                textStyle: { color: '#ffffff' }, // White axis labels
            },
            legend: { textStyle: { color: '#ffffff' } } // White legend text
        };

        const chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
}
