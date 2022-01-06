import React, { useEffect, useState } from "react";
import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { HistoryProps } from "../shared/common";
import axios from "axios";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function HistoryChart(props: HistoryProps) {

  const emptyData: History[] = [];
  const [historyData, setHistoryData] = useState(emptyData);
  const [isLoading, setIsLoading] = useState(true);
  const [plotType, setPlotType] = useState("Adj Close");

  useEffect(() => {
    axios.get<History[]>(`http://localhost:8001/api/securities/${props.symbolId}/graphdata?sdt=${props.startDt}&edt=${props.endDt}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.data.length > 0) {
          res.data = res.data.map((o: any) => {
            o[plotType] = Number(o[plotType]);
            return o;
          });
        }
        setHistoryData(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
      });
  }, [props, plotType]);

  const handlePlotTypeChange = (event: SelectChangeEvent) => {
    setPlotType(event.target.value as string);
  }

  const CustomToolTip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          <p className="intro">{`Volume: ${payload[0].payload.Volume}`}</p>
        </div>
      );
    }

    return null;
  }

  return (
    <>
      {
        isLoading ? <span>Loading...</span> : (
          <Grid mb={5} container rowSpacing={1} columnSpacing={1} width="90vw" height="65vh">
            <Grid item xs={12} pr={"2em"} textAlign={"right"}>
              <FormControl>
                <InputLabel id="plotLabel">Plot</InputLabel>
                <Select
                  labelId="plotLabel"
                  id="plotSelect"
                  value={plotType}
                  label="Plot"
                  onChange={handlePlotTypeChange}
                >
                  <MenuItem value={"Open"}>OPEN</MenuItem>
                  <MenuItem value={"High"}>HIGH</MenuItem>
                  <MenuItem value={"Low"}>LOW</MenuItem>
                  <MenuItem value={"Close"}>CLOSE</MenuItem>
                  <MenuItem value={"Adj Close"}>ADJ. CLOSE</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} textAlign={"right"}>
              <ResponsiveContainer>
                <AreaChart
                  data={historyData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Date" />
                  <YAxis />
                  <Tooltip content={<CustomToolTip />} />
                  <Area type="monotone" dataKey={plotType} stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </Grid>
          </Grid>)
      }
    </>
  );
}