import React, { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Pagination
} from "@mui/material";
import axios from "axios";
import {
  Column,
  DataCount,
  formatDate,
  History,
  HistoryProps
} from "../shared/common";

const pageSize = 12;

const columns: readonly Column[] = [
  {
    id: 'date',
    label: 'Date'
  },
  {
    id: 'open',
    label: 'Open',
    align: 'right'
  },
  {
    id: 'high',
    label: 'High',
    align: 'right'
  },
  {
    id: 'low',
    label: 'Low',
    align: 'right'
  },
  {
    id: 'close',
    label: 'Close',
    align: 'right'
  },
  {
    id: 'adjclose',
    label: 'Adj Close',
    align: 'right'
  },
  {
    id: 'volume',
    label: 'Volume',
    align: 'right'
  },
];

export default function HistoryCard(props: HistoryProps) {

  const emptyData: History[] = [];
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPageSize, setTotalPageSize] = useState(1);
  const [historyData, setHistoryData] = useState(emptyData);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  }

  useEffect(() => {
    axios.get<History[]>(`http://localhost:8001/api/securities/${props.symbolId}/list?pno=${pageNumber}&psz=${pageSize}&sdt=${props.startDt}&edt=${props.endDt}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        setHistoryData(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
      })
  }, [pageNumber, props]);

  useEffect(() => {
    axios.get<DataCount>(`http://localhost:8001/api/securities/${props.symbolId}/count?sdt=${props.startDt}&edt=${props.endDt}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        setTotalRecords(parseInt(res.data.count));
        setTotalPageSize(Math.ceil(totalRecords / pageSize));
      })
  }, [props, totalRecords]);

  return (
    <>
      {
        isLoading ? <span>Loading...</span> : (
          <>
            <Grid mb={5} container rowSpacing={1} columnSpacing={1}>
              {
                historyData.length > 0 && historyData.map((data) => (
                  <Grid key={data._id} item xs={4}>
                    <Card variant="outlined">
                      <CardHeader style={{ fontSize: '10px' }} title={ formatDate((data as any)[columns[0].label])} />
                      <CardContent style={{ backgroundColor: "#e6e8fa" }}>                        
                        <Grid container justifyContent={"flex-start"}>
                          <Grid item xs={4} textAlign={"right"}>
                            {columns[1].label}:
                          </Grid>
                          <Grid item xs={8} pl={5} textAlign={"left"}>
                            <b>{(data as any)[columns[1].label]}</b>
                          </Grid>
                        </Grid><Grid container justifyContent={"flex-start"}>
                          <Grid item xs={4} textAlign={"right"}>
                            {columns[2].label}:
                          </Grid>
                          <Grid item xs={8} pl={5} textAlign={"left"}>
                            <b>{(data as any)[columns[2].label]}</b>
                          </Grid>
                        </Grid>
                        <Grid container justifyContent={"flex-start"}>
                          <Grid item xs={4} textAlign={"right"}>
                            {columns[3].label}:
                          </Grid>
                          <Grid item xs={8} pl={5} textAlign={"left"}>
                            <b>{(data as any)[columns[3].label]}</b>
                          </Grid>
                        </Grid>
                        <Grid container justifyContent={"flex-start"}>
                          <Grid item xs={4} textAlign={"right"}>
                            {columns[4].label}:
                          </Grid>
                          <Grid item xs={8} pl={5} textAlign={"left"}>
                            <b>{(data as any)[columns[4].label]}</b>
                          </Grid>
                        </Grid>
                        <Grid container justifyContent={"flex-start"}>
                          <Grid item xs={4} textAlign={"right"}>
                            {columns[5].label}:
                          </Grid>
                          <Grid item xs={8} pl={5} textAlign={"left"}>
                            <b>{(data as any)[columns[5].label]}</b>
                          </Grid>
                        </Grid>
                        <Grid container justifyContent={"flex-start"}>
                          <Grid item xs={4} textAlign={"right"}>
                            {columns[6].label}:
                          </Grid>
                          <Grid item xs={8} pl={5} textAlign={"left"}>
                            <b>{(data as any)[columns[6].label]}</b>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              }
            </Grid>
            <Pagination count={totalPageSize} page={pageNumber} onChange={handleChange} />
          </>
        )
      }
    </>
  );
}