import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../../service/admin-service.service';
// import { Chart } from 'chart.js';
import { Chart,RadialLinearScale, RadarController, LinearScale, PointElement, LineController, CategoryScale, Title, Tooltip, Filler, Legend, LineElement } from 'chart.js';

@Component({
  selector: 'app-user-subscription-chart',
  templateUrl: './user-subscription-chart.component.html',
  styleUrl: './user-subscription-chart.component.scss'
})
export class UserSubscriptionChartComponent implements OnInit {

  constructor(private service:AdminServiceService){
    UserSubscriptionChartComponent.registerComponents();
  }

  
  ngOnInit(): void {
    this.createChart();
  }


  createChart() {
    this.service.getMonthlyUserAndSubscriptionData().subscribe(data => {
      new Chart('userSubscriptionChart', {
        type: 'radar',
        data: {
          labels: data.months,
          datasets: [
            {
              label: 'Users',
              data: data.users,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgb(54, 162, 235)',
              pointBackgroundColor: 'rgb(54, 162, 235)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgb(54, 162, 235)'
            },
            {
              label: 'Subscriptions',
              data: data.subscriptions,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgb(255, 99, 132)',
              pointBackgroundColor: 'rgb(255, 99, 132)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgb(255, 99, 132)'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio:true,
          aspectRatio:1,
          plugins: {
            title: {
              display: true,
              text: 'Monthly User & Subscription Data'
            },
            legend: {
              position: 'top',
            }
          }
        }
      });

    });
  }


  static registerComponents() {
    Chart.register(
      LineController,
      LineElement,
      RadialLinearScale,
      RadarController,
      LinearScale,
      PointElement,
      LineController,
      CategoryScale,
      Title,
      Tooltip,
      Filler,
      Legend
    );
  }

}
