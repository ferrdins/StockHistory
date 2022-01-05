import React, { useEffect, useState } from 'react';
import { Autocomplete, Button, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { TableRows, Timeline, ViewCompact } from '@mui/icons-material';
import { TextField, Tooltip } from '@material-ui/core';
import HistoryCard from './history/HistoryCard';
import HistoryChart from './history/HistoryChart';
import HistoryGrid from './history/HistoryGrid';
import axios from 'axios';
import { SymbolInfo } from './shared/common';

export default function SecurityHistory() {

  const emptySymbols: SymbolInfo[] = [];
  const [selectedValue, setSelectedValue] = useState<SymbolInfo | null>(null);
  const [displayMode, setDisplayMode] = useState('grid');
  const [searchText, setSearchText] = useState('');
  const [symbolData, setSymbolData] = useState(emptySymbols);
  const [symbolId, setSymbolId] = useState('');

  useEffect(() => {
    axios.get<SymbolInfo>(`http://localhost:8001/api/securities/search/symbols?s=${searchText}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        setSymbolData(res.data as any);
      })
  }, [searchText]);

  const loadData = () => {
    if (selectedValue) {
      setSymbolId(selectedValue._id);
    }
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
            <Button fullWidth style={{marginTop: '1em', marginLeft: '1em'}} variant='contained' onClick={loadData}>GO</Button>
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
            <HistoryCard symbolId={symbolId} startDt={'2021-12-01'} endDt={'2021-12-31'} /> : displayMode === 'chart' ?
              <HistoryChart /> : <HistoryGrid symbolId={symbolId} startDt={'2021-12-01'} endDt={'2021-12-31'} />
        }
      </Grid>
    </Grid>
  )
}