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
            id: 'carName',
            type: 'string'
          },
          {
            id: 'gender',
            type: 'string',
            values: ['Male', 'Female']
          },
          {
            id: 'countryName',
            type: 'string'
          },
          {
            id: 'time',
            type: 'date'
          },
          {
            id: 'modalYear',
            type: 'integer'
          }
        ]
      });
    }, 1000);
  }

  addNewContainer() {
    const html = $(`
    <div class="grid-stack-item" data-gs-x="0"
    data-gs-y="0" data-gs-width="4" data-gs-height="2">
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
      0, 0, 4, 4);

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
          <div class="chart-container" style="position: relative;">
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
                  label: 'Unfilled',
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
                  label: 'Dashed',
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
                  label: 'Filled',
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
                      beginAtZero: true,
                      fontColor: '#ffffff'
                    }
                  }]
                }
              }
            };

            const ctx2 = (document.getElementById(id1) as any).getContext('2d');
            (window as any).myLine = new Chart(ctx2, config);

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
