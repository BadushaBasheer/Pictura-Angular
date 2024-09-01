import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../../../services/admin.service";

declare var google: any;


@Component({
  selector: 'pie-chart',
  template: `
      <div id="piechart_3d"></div>
  `,
})
export class PieComponent implements OnInit {
    userCount: number | undefined;
    postsCount: number | undefined;
    blockedAccountsCount: number | undefined;

    constructor(private adminService: AdminService) { }

    ngOnInit(): void {
        this.loadUserCount();
        this.loadPostCount();
        this.loadBlockedCount();
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(() => this.drawChart()); // Ensure 'this' context is correct
    }

    loadUserCount(): void {
        this.adminService.getAllUserCount().subscribe(
            (count: number) => {
                this.userCount = count;
                this.drawChart(); // Redraw chart when data is loaded
            },
            (error) => {
                console.error('Error fetching user count:', error);
            }
        );
    }

    loadPostCount(): void {
        this.adminService.getAllPostsCount().subscribe(
            (count: number) => {
                this.postsCount = count;
                this.drawChart();
            },
            (error) => {
                console.error('Error fetching posts count:', error);
            }
        );
    }

    loadBlockedCount(): void {
        this.adminService.getAllBlockedAccountsCount().subscribe(
            (count: number) => {
                this.blockedAccountsCount = count;
                this.drawChart(); // Redraw chart when data is loaded
            },
            (error: any) => {
                console.error('Error fetching blocked accounts count:', error);
            }
        );
    }

    drawChart(): void {
        // Make sure to use default values if data is undefined
        const data = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['Total Users', this.userCount || 0],
            ['Posts', this.postsCount || 0],
            ['Blocked Accounts', this.blockedAccountsCount || 0],
        ]);

        const options = {
            is3D: true,
            backgroundColor: 'transparent',
            titleTextStyle: {
                color: 'white',
                fontSize: 20
            },
            legend: {
                textStyle: {
                    color: 'white'
                }
            },
            pieSliceTextStyle: {
                color: 'white'
            },
            slices: {
                0: { offset: 0.1 },
                1: { offset: 0.1 },
                2: { offset: 0.1 }
            },
            chartArea: {
                backgroundColor: 'transparent',
                left: 50,
                top: 50,
                width: '150%',
                height: '80%'
            },
            pieSliceBorderColor: 'black',
            pieStartAngle: 90
        };

        const chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
        chart.draw(data, options);
    }
}
