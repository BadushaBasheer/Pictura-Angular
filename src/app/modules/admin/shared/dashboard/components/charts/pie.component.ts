import {Component, OnInit} from '@angular/core';

declare var google: any;


@Component({
  selector: 'pie-chart',
  template: `
      <div id="piechart_3d"></div>
  `,
})
export class PieComponent  implements OnInit {

    constructor() { }

    ngOnInit(): void {
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(this.drawChart);
    }

    drawChart(): void {
        const data = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['Total Users', 15],
            ['Posts', 5],
            ['Male', 7],
            ['Female', 8],
        ]);

        const options = {
            // title: 'My Daily Activities',
            is3D: true,
            backgroundColor: 'transparent',
            titleTextStyle: {
                color: 'white', // Title text color
                fontSize: 20 // Optional: adjust the font size
            },
            legend: {
                textStyle: {
                    color: 'white' // Legend text color
                }
            },
            pieSliceTextStyle: {
                color: 'white' // Pie slice text color
            },
            slices: {
                0: { offset: 0.1 }, // Optional: adjust slice offset
                1: { offset: 0.1 }, // Optional: adjust slice offset
                2: { offset: 0.1 }, // Optional: adjust slice offset
                3: { offset: 0.1 }, // Optional: adjust slice offset
                4: { offset: 0.1 }  // Optional: adjust slice offset
            },
            chartArea: {
                backgroundColor: 'transparent', // Chart area background color
                left: 50,   // Adjust left margin
                top: 50,    // Adjust top margin
                width: '150%',  // Adjust width of the chart area
                height: '80%'  // Adjust height of the chart area
            },
            pieSliceBorderColor: 'black', // Optional: Set border color for pie slices
            pieStartAngle: 90 // Optional: Start angle for the pie chart
        };

        const chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);
    }
}
