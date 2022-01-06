import React, { useEffect, useState } from 'react';
import { Autocomplete, Button, Grid, TextField, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { TableRows, Timeline, ViewCompact } from '@mui/icons-material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateFnsUtils from '@date-io/date-fns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import HistoryCard from './history/HistoryCard';
import HistoryChart from './history/HistoryChart';
import HistoryGrid from './history/HistoryGrid';
import axios from 'axios';
import { SymbolInfo } from './shared/common';
import DateFilter from './history/DateFilter';
import { DatePicker } from '@mui/lab';
import { startOfMonth } from 'date-fns';

export default function SecurityHistory() {

  const emptySymbols: SymbolInfo[] = [];
  const [selectedValue, setSelectedValue] = useState<SymbolInfo | null>(null);
  const [displayMode, setDisplayMode] = useState('grid');
  const [searchText, setSearchText] = useState('');
  const [symbolData, setSymbolData] = useState(emptySymbols);
  const [symbolId, setSymbolId] = useState('');
  const [fromDt, setFromDt] = useState(startOfMonth(new Date()).toLocaleDateString());
  const [toDt, setToDt] = useState(new Date().toLocaleDateString());
  const [isCustomDt, setIsCustomDt] = useState(true);

  useEffect(() => {
    axios.get<SymbolInfo>(`http://localhost:8001/api/securities/search/symbols?s=${searchText}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        setSymbolData(res.data as any);
      })
      .catch(err => {
        console.log(err)
      }) 
  }, [searchText]);

  const loadData = () => {
    if (selectedValue) {
      setSymbolId(selectedValue._id);
    }
  }

  const handleCustomDtSelection = (isCustom: boolean) => {
    setIsCustomDt(isCustom);
  }

  const handleChangeFromDt = (dt: string) => {
    setFromDt(dt);
  }

  const handleChangeToDt = (dt: string) => {
    setToDt(dt);
  }

  return (
    <Grid container sx={{ p: 2 }}
      justifyContent="flex-end"
      direction="column"
    >
      <Grid item xs={12} textAlign={"left"}>
        <Grid container sx={{ p: 2 }}>
          <Grid item xs={10}>
            <Autocomplete
              getOptionLabel={(option) =>
                typeof option === 'string' ? option : `${option.symbol} - ${option.companyName}`
              }
              filterOptions={(x) => x}
              autoComplete
              options={symbolData}
              value={selectedValue}
              inputValue={searchText}
              onChange={(e, newSelectedValue: SymbolInfo | null) => {
                setSelectedValue(newSelectedValue);
              }}
              onInputChange={(e, newSearchText: any) => {
                setSearchText(newSearchText);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Search symbols" margin="normal" />
              )}
            />
          </Grid>
          <Grid item xs={1} textAlign={'center'}>
            <Button fullWidth style={{ marginTop: '2em', marginLeft: '1em' }} variant='contained' onClick={loadData}>GO</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} textAlign={"left"}>
        <ToggleButtonGroup
          value={displayMode}
          exclusive
          onChange={(e, val) => {
            if (val) {
              setDisplayMode(val);
            }
          }}
        >
          <ToggleButton value="grid">
            <Tooltip title="Table View">
              <TableRows />
            </Tooltip>
          </ToggleButton>
          <ToggleButton value="card">
            <Tooltip title="Card View">
              <ViewCompact />
            </Tooltip>
          </ToggleButton>
          <ToggleButton value="chart">
            <Tooltip title="Chart View">
              <Timeline />
            </Tooltip>
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid item xs={12} sx={{ pt: 2 }}>
        {
          displayMode === 'card' ?
            <HistoryCard symbolId={symbolId} startDt={fromDt} endDt={toDt} /> : displayMode === 'chart' ?
              <HistoryChart symbolId={symbolId} startDt={fromDt} endDt={toDt} /> : <HistoryGrid symbolId={symbolId} startDt={fromDt} endDt={toDt} />
        }
      </Grid>
      <Grid item xs={12} mt={2}>
        <Grid container sx={{ p: 1 }}>
          <Grid item xs={10} sx={{ pl: 1 }} textAlign={"right"}>
            <DateFilter handleCustomDt={handleCustomDtSelection} changeFromDt={handleChangeFromDt} changeToDt={handleChangeToDt}></DateFilter>
          </Grid>
          <Grid item xs={1} sx={{ pl: 1 }} textAlign={"right"}>
            <LocalizationProvider util={DateFnsUtils} dateAdapter={AdapterDateFns}>
              <DatePicker
                disabled={isCustomDt}
                label="From"
                value={fromDt}
                onChange={(newDate) => {
                  if (newDate) {
                    setFromDt(newDate);
                  }
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={1} sx={{ pl: 1 }} textAlign={"right"}>
            <LocalizationProvider util={DateFnsUtils} dateAdapter={AdapterDateFns}>
              <DatePicker
                disabled={isCustomDt}
                label="To"
                value={toDt}
                onChange={(newDate) => {
                  if (newDate) {
                    setToDt(newDate);
                  }
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}