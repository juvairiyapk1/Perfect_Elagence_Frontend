import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../../service/admin-service.service';
import { Chart, ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-subscription-revenue-chart',
  templateUrl: './subscription-revenue-chart.component.html',
  styleUrl: './subscription-revenue-chart.component.scss'
})
export class SubscriptionRevenueChartComponent implements OnInit{

  constructor(private service:AdminServiceService){}

  ngOnInit(): void {
    this.createChart();
  }



  createChart() {
    this.service.getMonthlyRevenue().subscribe(data => {
      const chartConfig: ChartConfiguration = {
        type: 'line',
        data: {
          labels: data.months,
          datasets: [{
            label: 'Monthly Subscription Revenue',
            data: data.revenue,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Revenue'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Month'
              }
            }
          }
        }
      };

      new Chart('subscriptionRevenueChart', chartConfig);
    });
  }

}
