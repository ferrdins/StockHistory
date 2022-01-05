import React, { useState, useEffect } from "react"
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableFooter, 
  TableHead, 
  TablePagination, 
  TableRow 
} from "@mui/material";
import axios from "axios";
import {
  Column,
  DataCount,
  formatDate,
  History,
  HistoryProps,
} from '../shared/common';


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

export default function HistoryGrid(props: HistoryProps) {

  const emptyData: History[] = [];
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const [historyData, setHistoryData] = useState(emptyData);
  const [isLoading, setIsLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);

  const handleChangePageNumber = (e: React.MouseEvent<HTMLButtonElement> | null, pageNumber: number) => {
    setPageNumber(pageNumber);
  }

  const handleChangePageSize = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPageSize(parseInt(e.target.value, 10));
    setPageNumber(0);
  }

  useEffect(() => {
    axios.get<History[]>(`http://localhost:8001/api/securities/${props.symbolId}/list?pno=${pageNumber + 1}&psz=${pageSize}&sdt=${props.startDt}&edt=${props.endDt}`, {
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
  }, [pageNumber, pageSize, props]);

  useEffect(() => {
    axios.get<DataCount>(`http://localhost:8001/api/securities/${props.symbolId}/count?sdt=${props.startDt}&edt=${props.endDt}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        setTotalRecords(parseInt(res.data.count));
      })
  }, [props]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {
              columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                >
                  {
                    column.label
                  }
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            isLoading ? <span>Loading...</span> : (
              historyData.length > 0 && historyData.map((data) => (
                <TableRow key={data._id}>
                  {
                    columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                      >
                        {column.id === 'date' ? formatDate((data as any)[column.label]) : (data as any)[column.label]}
                      </TableCell>
                    ))
                  }
                </TableRow>
              ))
            )
          }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              colSpan={3}
              count={totalRecords}
              rowsPerPage={pageSize}
              page={pageNumber}
              onPageChange={handleChangePageNumber}
              onRowsPerPageChange={handleChangePageSize}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}