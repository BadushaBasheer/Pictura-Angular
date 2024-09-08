import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AdminService} from "../../../../services/admin.service";

declare var google: any;

@Component({
    selector: 'histogram',
    template: `<div id="chart_div" ></div>`,
})
export class HistogramComponent implements AfterViewInit, OnInit {
    userCount: number = 0;
    postsCount: number = 0;
    blockedAccountsCount: number = 0;

    constructor(private adminService: AdminService) {
        google.charts.load('current', { packages: ['corechart', 'bar'] });
    }

    ngOnInit(): void {
        this.loadUserCount();
        this.loadPostCount();
        this.loadBlockedCount();
    }

    ngAfterViewInit(): void {
        google.charts.setOnLoadCallback(this.drawChart.bind(this));
    }

    // Load user count data
    loadUserCount(): void {
        this.adminService.getAllUserCount().subscribe(
            (count: number) => {
                this.userCount = count;
                this.drawChart();
            },
            (error) => {
                console.error('Error fetching user count:', error);
            }
        );
    }

    // Load posts count data
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

    // Load blocked accounts count data
    loadBlockedCount(): void {
        this.adminService.getAllBlockedAccountsCount().subscribe(
            (count: number) => {
                this.blockedAccountsCount = count;
                this.drawChart();
            },
            (error: any) => {
                console.error('Error fetching blocked accounts count:', error);
            }
        );
    }

    drawChart(): void {
        const data = google.visualization.arrayToDataTable([
            ['Metric', 'Count'],
            ['Total Users', this.userCount],
            ['Total Posts', this.postsCount],
            ['Blocked Accounts', this.blockedAccountsCount],
        ]);

        const options = {
            title: 'User Data',
            chartArea: { width: '50%' },
            hAxis: {
                title: 'Count',
                minValue: 0
            },
            vAxis: {
                title: 'Metric'
            }
        };

        const chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
}
