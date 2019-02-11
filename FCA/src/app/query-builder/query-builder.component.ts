import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.css']
})
export class QueryBuilderComponent implements OnInit, AfterViewInit {

  title = 'app';
  gridStack = null;
  model = 'Title';
  pieChartArea: any;
  zonalLine: any;
  yearLine4: any;
  barChart2: any;

  ngOnInit() {

  }

  ngAfterViewInit(): void {

    setTimeout(() => {

      $('.grid-stack').gridstack();

      this.gridStack = $('.grid-stack').data('gridstack');

      $('.chart-btn').draggable({
        helper: 'clone'
      });


      $('#builder').queryBuilder({
        filters: [
          {
            id: 'zone',
            type: 'string',
            input: 'select',
            values: ['East', 'West', 'North', 'South']
          },
          {
            id: 'is_offer_active',
            type: 'boolean',
            input: 'radio',
            values: {
              '1' : 'Active',
              '0': 'Deactived'
            }
          },
          {
            id: 'profit',
            type: 'integer',
            input: 'number'
          }
        ]
      });

      // pia chart
      const config = {
        type: 'pie',
        data: {
          datasets: [{
            data: [
              2000,
              2500,
              6000,
              7500
            ],
            backgroundColor: [
              (window as any).chartColors.red,
              (window as any).chartColors.orange,
              (window as any).chartColors.yellow,
              (window as any).chartColors.green,
            ],
            label: 'Dataset 1'
          }],
          labels: [
            'East',
            'West',
            'North',
            'South'
          ]
        },
        options: {
          responsive: true,
          legend: {
            position: 'bottom',
            labels: {
              fontColor: '#ffffff'
            }
          },
        }
      };

      const ctx1 = (document.getElementById('pie-chart-area') as any).getContext('2d');
      this.pieChartArea = new Chart(ctx1, config);


      // line chart 2
      const config2 = {
        type: 'line',
        data: {
          labels: ['October', 'November', 'December'],
          datasets: [
            {
              label: 'Q4Jeep - East',
              backgroundColor: (window as any).chartColors.red,
              borderColor: (window as any).chartColors.red,
              data: [
                3000, 6000, 3500
              ],
              fill: false,
            },
            {
              label: 'Q4Jeep - West',
              backgroundColor: (window as any).chartColors.blue,
              borderColor: (window as any).chartColors.blue,
              data: [
                7000, 8500, 6600
              ],
              fill: false,
            },
            {
              label: 'Q4Jeep - North',
              backgroundColor: (window as any).chartColors.green,
              borderColor: (window as any).chartColors.green,
              data: [
                2000, 2100, 850
              ],
              fill: false,
            },
            {
              label: 'Q4Jeep - South',
              backgroundColor: (window as any).chartColors.yellow,
              borderColor: (window as any).chartColors.yellow,
              data: [
                5000, 6700, 4650
              ],
              fill: false,
            }
          ]
        },
        options: {
          responsive: true,
          legend: {
            position: 'bottom',
            labels: {
              fontColor: '#ffffff'
            }
          },
          title: {
            display: false,
          },
          tooltips: {
            mode: 'index',
            intersect: false,
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Month'
              },
              ticks: {
                fontColor: '#ffffff'
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Value'
              },
              ticks: {
                fontColor: '#ffffff'
              }
            }]
          }
        }
      };

      const ctx2 = (document.getElementById('line-chart-area-zonal') as any).getContext('2d');
      this.zonalLine = new Chart(ctx2, config2);

      // total sales per month 3

      const color = Chart.helpers.color;

      const barChartData = {
        labels: ['Q4Jeep', 'NovRam', 'Q4Chrysler'],
        datasets: [{
          label: 'Sales',
          backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
          borderColor: chartColors.blue,
          borderWidth: 1,
          data: [
            212333,
            344490,
            783429
          ]
        }]
      };


      const ctx3 = (document.getElementById('bar-chart-area') as any).getContext('2d');
      this.barChart2 = new Chart(ctx3, {
        type: 'bar',
        data: barChartData,
        options: {
          responsive: true,
          legend: {
            position: 'bottom',
            labels: {
              fontColor: '#ffffff'
            }
          },
          scales: {
            xAxes: [{
              display: true,
              color: "rgba(255,99,132,0.2)",
              ticks: {
                fontColor: '#ffffff',
              }
            }],
            yAxes: [{
              display: true,
              ticks: {
                fontColor: '#ffffff'
              }
            }]
          }
        }
      });


      // line chart 4
      const config4 = {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: '2019',
              backgroundColor: (window as any).chartColors.red,
              borderColor: (window as any).chartColors.red,
              data: [
                136082
              ],
              fill: false,
            },
            {
              label: '2018',
              backgroundColor: (window as any).chartColors.blue,
              borderColor: (window as any).chartColors.blue,
              data: [
                132803, 165903, 216063, 184149, 214294, 202264, 170970, 193718, 199819, 177391, 181310, 196520
              ],
              fill: false,
            },
            {
              label: '2017',
              backgroundColor: (window as any).chartColors.green,
              borderColor: (window as any).chartColors.green,
              data: [
                152218, 168326, 190254, 176176, 193040, 187348, 161477, 176033, 174266, 153373, 154919, 171946
              ],
              fill: false,
            },
            {
              label: '2016',
              backgroundColor: (window as any).chartColors.yellow,
              borderColor: (window as any).chartColors.yellow,
              data: [
                171352, 187318, 199467, 189005, 194720, 202421, 180389, 196805, 192883, 176609, 160827, 192519
              ],
              fill: false,
            },
            {
              label: '2015',
              backgroundColor: (window as any).chartColors.purple,
              borderColor: (window as any).chartColors.purple,
              data: [
                145007, 163586, 197261, 189027, 202227, 185035, 180124, 190887, 194666, 196898, 187731, 213923
              ],
              fill: false,
            }
          ]
        },
        options: {
          responsive: true,
           legend: {
            position: 'bottom',
            labels: {
              fontColor: '#ffffff'
            }
          },
          title: {
            display: false,
          },
          tooltips: {
            mode: 'index',
            intersect: false,
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Month'
              },
              ticks: {
                fontColor: '#ffffff'
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Value'
              },
              ticks: {
                fontColor: '#ffffff'
              }
            }]
          }
        }
      };

      const ctx4 = (document.getElementById('monthly-line-chart-area') as any).getContext('2d');
      this.yearLine4 = new Chart(ctx4, config4);

    }, 1000);
  }

  addNewContainer() {
    const html = $(`
    <div class="grid-stack-item" data-gs-x="0"
    data-gs-y="0" data-gs-width="6" data-gs-height="5">
    <div style="color: white;text-align: center;">
    <div style="width: 100%;font-size: 14px;font-weight: bold;letter-spacing: 2px;
    "contenteditable="true" [textContent]="model" (input)="model=$event.target.textContent"></div>
    </div>
    <div class="grid-stack-item-content"></div>
    <div class=" del-container">
    <div onclick="deleteQueryContainer(event)" class="ui secondary button">Delete</div>
    <div onclick="dataSourceContainer(event)" class="ui secondary button data-source-container">Data Source</div>
    </div>
      </div>`);

    this.gridStack.addWidget(html,
      0, 0, 6, 5);

    this.initNewContentScripts($('.grid-stack-item-content', html));

    console.log('Title value : ' + this.model);
  }


  initNewContentScripts(ele) {

    ele.droppable({
      drop: (event, ui) => {
        const id1 = uuidv4();
        const chartType = (_.chain(ui.draggable.text()).trim().lowerCase().value());

        const container = event.target;
        ele.html(`
          <div class="chart-container" style="position: relative;padding-bottom:50px">
              <canvas id="${id1}"></canvas>
          </div>
        `);

        switch (chartType) {
          case 'bar chart':
            const ctx = document.getElementById(id1);
            const myChart = new Chart(ctx, {
              responsive: true,
              type: 'bar',
              data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                  label: '# of Sold cars',
                  data: [12, 19, 3, 5, 2, 3],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
                }]
              },
              options: {
                scales: {
                  xAxes: [{
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'Month'
                    },
                    ticks: {
                      fontColor: '#ffffff'
                    }
                  }],
                  yAxes: [{
                    ticks: {
                      beginAtZero: true,
                      fontColor: '#ffffff'
                    }
                  }]
                },
                title: {
                  display: true,
                  text: 'Bar Chart',
                  fontColor: '#f0f0f0'
                }
              }
            });


            if ($(ctx).length) {
              $(ctx).data('graph', myChart);
            }
            break;

          case 'line chart':

            const config = {
              type: 'line',
              data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                  label: 'October',
                  fill: false,
                  backgroundColor: (window as any).chartColors.blue,
                  borderColor: (window as any).chartColors.blue,
                  data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                  ],
                }, {
                  label: 'November',
                  fill: false,
                  backgroundColor: (window as any).chartColors.green,
                  borderColor: (window as any).chartColors.green,
                  borderDash: [5, 5],
                  data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                  ],
                }, {
                  label: 'December',
                  backgroundColor: (window as any).chartColors.red,
                  borderColor: (window as any).chartColors.red,
                  data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                  ],
                  fill: true,
                }]
              },
              options: {
                responsive: true,
                legend: {
                  position: 'bottom',
                  labels: {
                    fontColor: '#ffffff'
                  }
                },
                title: {
                  display: true,
                  text: 'Line Chart',
                  fontColor: '#f0f0f0'
                },
                tooltips: {
                  mode: 'index',
                  intersect: false,
                },
                hover: {
                  mode: 'nearest',
                  intersect: true
                },
                scales: {
                  xAxes: [{
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'offers'
                    },
                    ticks: {
                      fontColor: '#ffffff'
                    }
                  }],
                  yAxes: [{
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'Value'
                    },
                    ticks: {
                      beginAtZero: true,
                      fontColor: '#ffffff'
                    }
                  }]
                }
              }
            };

            const ctx2 = (document.getElementById(id1) as any).getContext('2d');
            const myLine = new Chart(ctx2, config);


            const ele2 = document.getElementById(id1);

            if ($(ele2).length) {
              $(ele2).data('graph', myLine);
            }

            break;

          case 'area chart':

            const utils = Samples.utils;

            const data = {
              labels: generateLabels(),
              datasets: [{
                backgroundColor: utils.transparentize(presets.red),
                borderColor: presets.red,
                data: generateData(),
                label: 'D0'
              }, {
                backgroundColor: utils.transparentize(presets.orange),
                borderColor: presets.orange,
                data: generateData(),
                hidden: true,
                label: 'D1',
                fill: '-1'
              }, {
                backgroundColor: utils.transparentize(presets.yellow),
                borderColor: presets.yellow,
                data: generateData(),
                label: 'D2',
                fill: 1
              }, {
                backgroundColor: utils.transparentize(presets.green),
                borderColor: presets.green,
                data: generateData(),
                label: 'D3',
                fill: false
              }, {
                backgroundColor: utils.transparentize(presets.blue),
                borderColor: presets.blue,
                data: generateData(),
                label: 'D4',
                fill: '-1'
              }, {
                backgroundColor: utils.transparentize(presets.purple),
                borderColor: presets.purple,
                data: generateData(),
                label: 'D5',
                fill: '-1'
              }]
            };

            const options = {
              maintainAspectRatio: true,
              spanGaps: false,
              elements: {
                line: {
                  tension: 0.000001
                }
              },
              plugins: {
                filler: {
                  propagate: false
                },
                'samples-filler-analyser': {
                  target: 'chart-analyser'
                }
              },
              title: {
                display: true,
                text: 'Radar Chart',
                fontColor: '#f0f0f0'
              }
            };

            const chart = new Chart(id1, {
              type: 'radar',
              data: data,
              options: options
            });

            break;
        }
      }
    });
  }



}
