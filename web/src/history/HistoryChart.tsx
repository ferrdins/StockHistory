import React, { PureComponent } from "react";
import { Grid } from "@mui/material";
import { HistoryProps } from "../shared/common";
import axios from "axios";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default class Example extends PureComponent<HistoryProps, {isLoading: boolean, historyData: History[]}>{

  constructor(props: HistoryProps) {
    super(props);
    this.state = {
      isLoading: true,
      historyData: [],
    }
  }
  
  componentDidMount() {
    axios.get<History[]>(`http://localhost:8001/api/securities/${this.props.symbolId}/graphdata?sdt=${this.props.startDt}&edt=${this.props.endDt}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        this.setState({
          isLoading: false,
          historyData: res.data
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false
        });
      });
  }

  render() {
  return (
    <>
      {
        this.state.isLoading ? <span>Loading...</span> : (
          <Grid mb={5} container rowSpacing={1} columnSpacing={1}>
            <ResponsiveContainer width={"100%"} height={"100%"}>
              <AreaChart
                width={500}
                height={400}
                data={this.state.historyData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray={"3 3"} />
                <XAxis dataKey={"Close"} />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </Grid>)
      }    
    </>
  );
    }
}