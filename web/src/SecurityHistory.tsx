import React, { useState } from 'react';
import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { TableRows, Timeline, ViewCompact } from '@mui/icons-material';
import { Tooltip } from '@material-ui/core';
import HistoryCard from './history/HistoryCard';
import HistoryChart from './history/HistoryChart';
import HistoryGrid from './history/HistoryGrid';

export default function SecurityHistory() {

  const [displayMode, setDisplayMode] = useState('grid');

  return (
    <Grid container sx={{ p: 2 }}
      justifyContent="flex-end"
      direction="column"
    >
      <Grid item xs={12}>
        <ToggleButtonGroup
          value={displayMode}
          exclusive
          onChange={(e, val) => {
            if(val) {
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
            <HistoryCard /> : displayMode === 'chart' ?
              <HistoryChart /> : <HistoryGrid symbolId={'61d183196ff516af6cf24dca'} startDt={'2021-12-01'} endDt={'2021-12-31'}/>
        }
      </Grid>
    </Grid>
  )
}