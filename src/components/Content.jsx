import React, { Component } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTimeline: [],
      dataTimeline15: [],
      data_text: {
        updateDate: "",
        confirmed: "",
        hospitalized: "",
        deaths: "",
        recovered: "",
        newConfirmed: "",
        newHospitalized: "",
        newDeaths: "",
        newRecovered: "",
      },
      data_pie: [{}],
    };
  }

  componentDidMount() {
    this.callAPI();
  }

  callAPI() {
    axios
      .get("https://covid19.th-stat.com/api/open/timeline")
      .then((response) => {
        console.log(response.data);
        const data = response.data["Data"];
        const lastData = data.slice(-1)[0];
        this.setState({
          dataTimeline: data,
          dataTimeline15: data.slice(1).slice(-15),
          data_text: {
            source: response.data["Source"],
            updateDate: lastData["Date"],
            confirmed: lastData["Confirmed"],
            hospitalized: lastData["Hospitalized"],
            deaths: lastData["Deaths"],
            recovered: lastData["Recovered"],
            newConfirmed: lastData["NewConfirmed"],
            newHospitalized: lastData["NewHospitalized"],
            newDeaths: lastData["NewDeaths"],
            newRecovered: lastData["NewRecovered"],
          },
          data_pie: [
            { name: "hospitalized", value: lastData["Hospitalized"] },
            { name: "deaths", value: lastData["Deaths"] },
            { name: "recovered", value: lastData["Recovered"] },
          ],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { dataTimeline, dataTimeline15, data_text, data_pie } = this.state;
    return (
      <div className="Content">
        <div className="container">
          <div className="row">
            <div className="col-md-3 mt-4">
              <div className="card-counter info">
              <i className="fas fa-virus"></i>
                <span className="count-numbers">{data_text.confirmed.toLocaleString()}</span>
                <span className="count-name">CONFIRMED ({data_text.newConfirmed.toLocaleString()})</span>
              </div>
            </div>
            <div className="col-md-3 mt-4">
            <div className="card-counter primary">
            <i className="fas fa-hospital"></i>
                <span className="count-numbers">{data_text.hospitalized.toLocaleString()}</span>
                <span className="count-name">HOSPITALIZED ({data_text.newHospitalized.toLocaleString()})</span>
              </div>
            </div>
            <div className="col-md-3 mt-4">
            <div className="card-counter success">
            <i className="fas fa-user-md"></i>
                <span className="count-numbers">{data_text.recovered.toLocaleString()}</span>
                <span className="count-name">RECOVERED ({data_text.newRecovered.toLocaleString()})</span>
              </div>
            </div>
            <div className="col-md-3 mt-4">
            <div className="card-counter danger">
            <i className="fas fa-skull-crossbones"></i>
                <span className="count-numbers">{data_text.deaths.toLocaleString()}</span>
                <span className="count-name">DEATHS ({data_text.newDeaths.toLocaleString()})</span>
              </div>
            </div>
            <div className="col-md-6 mt-4">
              <div className="card" align="center">
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart width={500} height={300} data={dataTimeline15}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="NewConfirmed" fill="#8884d8" />
                      <Bar dataKey="NewDeaths" fill="#FF9AA2" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-4">
              <div className="card">
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart width={400} height={300}>
                      <Legend />
                      <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={data_pie}
                        outerRadius={100}
                        label
                      >
                        <Cell fill="#8884d8" />
                        <Cell fill="#FF9AA2" />
                        <Cell fill="#8FC1A9" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={dataTimeline}
                      margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Date" />
                      <YAxis />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="Confirmed"
                        stroke="blue"
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="Hospitalized"
                        stroke="orange"
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="Deaths"
                        stroke="red"
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="Recovered"
                        stroke="green"
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
