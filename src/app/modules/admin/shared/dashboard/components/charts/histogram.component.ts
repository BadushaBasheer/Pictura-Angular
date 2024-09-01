import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../../../services/admin.service";

declare var google: any;

@Component({
  selector: 'histogram',
  template:`<div class="w-fit" id="chart_div" ></div>`,
})
export class HistogramComponent implements OnInit {
    userCount: number | undefined;
    postsCount: number | undefined;
    blockedAccountsCount: number | undefined;

    constructor(private adminService: AdminService) { }

    ngOnInit(): void {
        this.loadUserCount();
        this.loadPostCount();
        this.loadBlockedCount();
        google.charts.load('current', { packages: ['corechart', 'bar'] });
        google.charts.setOnLoadCallback(() => this.drawMultSeries());
    }

    loadUserCount(): void {
        this.adminService.getAllUserCount().subscribe(
            (count: number) => {
                this.userCount = count;
                this.drawMultSeries(); // Redraw chart when data is loaded
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
                this.drawMultSeries(); // Redraw chart when data is loaded
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
                this.drawMultSeries(); // Redraw chart when data is loaded
            },
            (error) => {
                console.error('Error fetching blocked accounts count:', error);
            }
        );
    }

    drawMultSeries(): void {
        // Ensure default values if data is undefined
        const data = new google.visualization.DataTable();
        data.addColumn('timeofday', 'Time of Day');
        data.addColumn('number', 'User Count');
        data.addColumn('number', 'Posts Count');
        data.addColumn('number', 'Blocked Accounts Count');

        // Populate data with placeholder values
        data.addRows([
            [{ v: [8, 0, 0], f: '8 am' }, this.userCount || 0, this.postsCount || 0, this.blockedAccountsCount || 0],
            [{ v: [9, 0, 0], f: '9 am' }, this.userCount || 0, this.postsCount || 0, this.blockedAccountsCount || 0],
            [{ v: [10, 0, 0], f: '10 am' }, this.userCount || 0, this.postsCount || 0, this.blockedAccountsCount || 0],
            [{ v: [11, 0, 0], f: '11 am' }, this.userCount || 0, this.postsCount || 0, this.blockedAccountsCount || 0],
            [{ v: [12, 0, 0], f: '12 pm' }, this.userCount || 0, this.postsCount || 0, this.blockedAccountsCount || 0],
            [{ v: [13, 0, 0], f: '1 pm' }, this.userCount || 0, this.postsCount || 0, this.blockedAccountsCount || 0],
            [{ v: [14, 0, 0], f: '2 pm' }, this.userCount || 0, this.postsCount || 0, this.blockedAccountsCount || 0],
            [{ v: [15, 0, 0], f: '3 pm' }, this.userCount || 0, this.postsCount || 0, this.blockedAccountsCount || 0],
            [{ v: [16, 0, 0], f: '4 pm' }, this.userCount || 0, this.postsCount || 0, this.blockedAccountsCount || 0],
            [{ v: [17, 0, 0], f: '5 pm' }, this.userCount || 0, this.postsCount || 0, this.blockedAccountsCount || 0],
        ]);

        const options = {
            title: 'Statistics Throughout the Day',
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
                title: 'Count',
                textStyle: { color: '#ffffff' }, // White axis labels
            },
            legend: { textStyle: { color: '#ffffff' } } // White legend text
        };

        const chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
}
