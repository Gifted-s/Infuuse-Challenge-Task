import React, { Component } from 'react'
import { Line, Pie, Bar, HorizontalBar } from 'react-chartjs-2'
export default class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            mockdataForCompanySales:[]
        }
    }

    componentDidMount() {
        const labels = []
        const data = []
        let userdata = this.props.data
        for (let i = 0; i < userdata.length; i++) {
            data.push(userdata[i].age)
            labels.push(userdata[i].name)
        }
        this.setState({ mockdataForCompanySales: {
            labels: labels,
            datasets: [
                {
                    label: "Company Sales",
                    data,
                    borderWidth: 1,
                    borderColor: '#777',
                    hoverBorderWidth: 3,
                    fill: false,
                    hoverBorderColor: '#000'
                },
                {
                    label: "Number of days",
                    data:[0,10,20,30,40,50,60,70,80,90],
                    borderWidth: 1,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(255, 99, 132, 0.8)',
                    hoverBorderWidth: 3,
                    fill: false,
                    hoverBorderColor: '#000'
                },

            ]
        }
    
    })
        this.setState({
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Grah of Company Sales",
                        data,
                        backgroundColor: [
                            "rgba(54,142,215,0.6)",
                            'rgba(54,162,235,0.6)',
                            'rgba(255,206,86,0.6)',
                            'rgba(75,192,192,0.6)',
                            'rgba(153,102,255,0.6)',
                            'rgba(255,159,64,0.6)',
                            'rgba(255,190,132,0.6)',
                            "rgba(255,99,192,0.6)"
                        ],
                        borderWidth: 1,
                        borderColor: '#777',
                        hoverBorderWidth: 3,
                        fill: false,
                        hoverBorderColor: '#000'
                    }
                ]
            }
        })
    }

    render() {

        const graphConfig = {
            maintainAspectRatio: false,
            title: {
                display: true,
                text: "",
                fontSize: '14'
            },
            legend: {
                display: true,
                position: 'top',

            }

        }
        return (
            <div className="container-fluid">
                <div className="row dd">
                <div className="row" style={{ marginTop: 50, width: '100%' }}>
                        <div className="col-md-6 each_bar" style={{ height: '70vh', width: '100%' }}>
                            <Line
                                data={this.state.mockdataForCompanySales}
                                options={graphConfig}
                            />
                        </div>


                        <div className="col-md-6 each_bar" style={{ height: '70vh', width: '100%' }}>
                            <Line
                                data={this.state.data}
                                options={graphConfig}
                            />
                        </div>

                    </div>
                    <div className="col-md-12 each_bar" style={{ height: '70vh', width: 600 }}>
                        <Pie
                            data={this.state.data}
                            options={graphConfig}
                        />
                    </div>
                    <div className="row" style={{ marginTop: 50, width: '100%' }}>
                        <div className="col-md-6 each_bar" style={{ height: '70vh', width: '100%' }}>
                            <Bar
                                data={this.state.data}
                                options={graphConfig}
                            />
                        </div>


                        <div className="col-md-6 each_bar" style={{ height: '70vh', width: '100%' }}>
                            <HorizontalBar
                                data={this.state.data}
                                options={graphConfig}
                            />
                        </div>

                    </div>
                </div>

            </div>
        )
    }


}


