import { BaseChartDirective } from 'ng2-charts';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, registerables,} from 'chart.js';
import { AdminServiceService } from '../../service/admin-service.service';
import { SUBCRIPTION } from '../../model/Interface';

Chart.register(...registerables)


@Component({
  selector: 'app-annual-subscription-chart',
  templateUrl: './annual-subscription-chart.component.html',
  styleUrl: './annual-subscription-chart.component.scss'
})
export class AnnualSubscriptionChartComponent implements OnInit{

  chartData:SUBCRIPTION[]=[];
  labelData:number[]=[];
  realData:number[]=[];
  colorData:string[]=[];

  constructor(private service:AdminServiceService){
  }

  ngOnInit(): void {
    this.loadSubcriptionChart();
  }

  loadSubcriptionChart(){
    this.service.loadSubcriptions().subscribe((item)=>{
       this.chartData=item;
       if(this.chartData != null){
        this.chartData.map(o=>{
          this.labelData.push(o.year)
          this.realData.push(o.subcribedUser)
          this.colorData.push(o.colorCode)
        }
        );
        this.renderChart(this.labelData,this.realData,this.colorData);
       }
    })
  }

  renderChart(labelData:number[],valueData:number[],colorData:string[]){
    const mychart = new Chart('radar',{
      type:'radar',
      data:{
       labels:labelData,
       datasets:[
        {
          data:valueData,
          backgroundColor:colorData
        }
       ]
      },
      options:{

      }

    })
  }

  public radarChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: false,
  };
  public radarChartLabels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  public radarChartDatasets: ChartConfiguration<'radar'>['data']['datasets'] = [
    { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
  ];

  
}
