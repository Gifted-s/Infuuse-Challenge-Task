import React, { Component } from 'react'
import { Line, Pie, Bar, HorizontalBar } from 'react-chartjs-2'
export default class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
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
        this.setState({
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Age",
                        data,
                        backgroundColor: [
                            "rgba(54,142,215,0.6)",
                            'rgba(54,162,235,0.6)',
                            'rgba(255,206,86,0.6)',
                            'rgba(75,192,192,0.6)',
                            'rgba(153,102,255,0.6)',
                            'rgba(255,159,64,0.6)',
                            'rgba(255,190,132,0.6)',
                            "rgba(255,99,192,0.6)",
                            'rgba(54,162,205,0.6)',
                            'rgba(255,206,100,0.6)',
                            'rgba(75,192,0,0.6)',
                            'rgba(153,102,204,0.6)',
                            'rgba(255,159,89,0.6)',
                            'rgba(255,102,200,0.6)',
                            "rgba(255,99,192,0.6)",
                            'rgba(54,122,25,0.6)',
                            'rgba(255,56,100,0.6)',
                            'rgba(75,18,200,0.6)',
                            'rgba(153,190,204,0.6)',
                            'rgba(255,20,33,0.6)',
                            'rgba(0,102,200,0.6)',


                        ],
                        borderWidth: 1,
                        borderColor: '#777',
                        hoverBorderWidth: 3,
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
                text: "Representation of each user against age",
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
                    <div className="col-md-12 each_bar" style={{ height: '70vh', width: 600 }}>
                        <Line
                            data={this.state.data}
                            options={graphConfig}
                        />
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


