import { Line as LineChart } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';
import React, { Component } from 'react';

// Electricity cost chart widget component
export default class Chart extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        errorMessage: ''
      }
    }
    componentDidMount = () => {
      let url = "https://api.eia.gov/series/?api_key=5e0259bbf27b793b53e38ce8f6872d0b&series_id=ELEC.PRICE.WA-RES.M";
      fetch(url).then(function (response) {
        return response.json();
      })
        .then((data) => {
          let result = data.series[0].data.slice(0, 20);
          this.setState({ data: result });
        })
        .catch((err => {
          this.setState({ errorMessage: err.message });
        }))
    }
  
    render() {
      let data = [];
      let labels = [];
      let result = this.state.data;
      for (let d of result) {
        labels.push(d[0].substring(0, 4) + "-" + d[0].substring(4));
        data.push(d[1]);
      }
      labels = labels.reverse();
      data = data.reverse();
      defaults.global.defaultFontColor = 'white';
      return (
        <section id="graph" className="main-sections dash-section">
          <div id="chart1">
            <LineChart
              data={{
                labels: labels,
                datasets: [{
                  label: "Average retail price of electricity in WA per month",
                  data: data,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.3)',
                    'rgba(54, 162, 235, 0.3)',
                    'rgba(255, 206, 86, 0.3)',
                    'rgba(75, 192, 192, 0.3)',
                    'rgba(153, 102, 255, 0.3)',
                    'rgba(255, 159, 64, 0.3)'
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
              }}
              width={400}
              height={355}
              options={{
                maintainAspectRatio: false,
                scales: {
                  yAxes: [{
                    ticks: {
                      beginAtZero: false
                    },
                    scaleLabel: {
                      display: true,
                      labelString: 'Cents per KWh'
                    },
                    gridLines: {
                      display: false
                    }
                  }],
                  xAxes: [{
                    gridLines: {
                      display: false
                    }
                  }]
                },
                legend: {
                  display: false,
                  position: 'bottom',
                  labels: {
                    fontSize: 16
                  }
                },
                title: {
                  display: true,
                  text: 'Average retail price of electricity in WA per month',
                  fontSize: 16,
                  position: 'top'
                }
              }}
            />
          </div>
        </section>
      );
    }
  }