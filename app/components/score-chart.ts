import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Chart from 'chart.js';

interface ScoreChartArgs {
  p1Score: number;
  p2Score: number;
}

export default class ScoreChart extends Component<ScoreChartArgs> {
  @tracked chart: Chart | undefined;

  updateChart = (element: HTMLElement, [p1Score, p2Score]: [number, number]) => {
    let chart = this.chart;

    if (chart && chart.data.datasets) {
      chart.data.datasets[0].data = [p1Score, p2Score];
      chart.update();
    }
  };

  mountChart = () => {
    let ctx = document.querySelector('#myChart');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'P1',
          'P2',
          // 'Yellow',
          // 'Green',
          // 'Purple',
          // 'Orange'
        ],
        datasets: [
          {
            label: 'Score',
            data: [this.args.p1Score, this.args.p2Score],
            // data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              // 'rgba(255, 206, 86, 0.2)',
              // 'rgba(75, 192, 192, 0.2)',
              // 'rgba(153, 102, 255, 0.2)',
              // 'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              // 'rgba(255, 206, 86, 1)',
              // 'rgba(75, 192, 192, 1)',
              // 'rgba(153, 102, 255, 1)',
              // 'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  };
}
