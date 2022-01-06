import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import { startOfMonth } from "date-fns";
import { startOfYear } from "date-fns/esm";
import { subMonths } from "date-fns/fp";
import React, { useState } from "react";
import { DateRange } from "../shared/common";
import Constants from "../shared/Constants";

const DateFilter = (props: DateRange) => {
  const [dateType, setDateType] = useState(Constants.OneMonth);
  return (
    <ToggleButtonGroup
          value={dateType}
          exclusive
          onChange={(e, val) => {
            if (val) {
              if(val === Constants.CustomDateRange) {
                props.handleCustomDt(false);
              } else {
                props.handleCustomDt(true);
                switch(val) {
                  case Constants.OneMonth: {
                    const startDt = startOfMonth(new Date());
                    props.changeFromDt(startDt.toLocaleDateString());
                    props.changeToDt(new Date().toLocaleDateString());
                  }
                  break;
                  case Constants.ThreeMonths: {
                    let startDt = startOfMonth(new Date());
                    startDt = subMonths(2, startDt);
                    props.changeFromDt(startDt.toLocaleDateString());
                    props.changeToDt(new Date().toLocaleDateString());
                  }
                  break;
                  case Constants.SixMonths: {
                    let startDt = startOfMonth(new Date());
                    startDt = subMonths(5, startDt);
                    props.changeFromDt(startDt.toLocaleDateString());
                    props.changeToDt(new Date().toLocaleDateString());
                  }
                  break;
                  case Constants.YearToDate: {
                    let startDt = startOfYear(new Date());
                    props.changeFromDt(startDt.toLocaleDateString());
                    props.changeToDt(new Date().toLocaleDateString());
                  }
                  break;
                  case Constants.OneYear: {
                    let startDt = startOfMonth(new Date());
                    startDt = subMonths(11, startDt);
                    props.changeFromDt(startDt.toLocaleDateString());
                    props.changeToDt(new Date().toLocaleDateString());
                  }
                  break;
                  case Constants.TwoYear: {
                    let startDt = startOfMonth(new Date());
                    startDt = subMonths(12 + 11, startDt);
                    props.changeFromDt(startDt.toLocaleDateString());
                    props.changeToDt(new Date().toLocaleDateString());
                  }
                  break;
                  case Constants.ThreeYear: {
                    let startDt = startOfMonth(new Date());
                    startDt = subMonths(24 + 11, startDt);
                    props.changeFromDt(startDt.toLocaleDateString());
                    props.changeToDt(new Date().toLocaleDateString());
                  }
                  break;
                  case Constants.FiveYear: {
                    let startDt = startOfMonth(new Date());
                    startDt = subMonths(48 + 11, startDt);
                    props.changeFromDt(startDt.toLocaleDateString());
                    props.changeToDt(new Date().toLocaleDateString());
                  }
                  break;
                }     
              }     
              setDateType(val);  
            }
          }}
        >
          <ToggleButton value={Constants.OneMonth}>
            <Tooltip title={'One Month'}>
              <div>{Constants.OneMonth}</div>
            </Tooltip>
          </ToggleButton>
          <ToggleButton value={Constants.ThreeMonths}>
            <Tooltip title={'Three Months'}>
              <div>{Constants.ThreeMonths}</div>
            </Tooltip>
          </ToggleButton>
          <ToggleButton value={Constants.SixMonths}>
            <Tooltip title={'Six Months'}>
              <div>{Constants.SixMonths}</div> 
            </Tooltip>
          </ToggleButton>
          <ToggleButton value={Constants.YearToDate}>
            <Tooltip title={'Year To Date'}>
              <div>{Constants.YearToDate}</div> 
            </Tooltip>
          </ToggleButton>
          <ToggleButton value={Constants.OneYear}>
            <Tooltip title={'One Year'}>
              <div>{Constants.OneYear}</div> 
            </Tooltip>
          </ToggleButton>
          <ToggleButton value={Constants.TwoYear}>
            <Tooltip title={'Two Year'}>
              <div>{Constants.TwoYear}</div> 
            </Tooltip>
          </ToggleButton>
          <ToggleButton value={Constants.ThreeYear}>
            <Tooltip title={'Three Year'}>
              <div>{Constants.ThreeYear}</div> 
            </Tooltip>
          </ToggleButton>
          <ToggleButton value={Constants.FiveYear}>
            <Tooltip title={'Five Year'}>
              <div>{Constants.FiveYear}</div> 
            </Tooltip>
          </ToggleButton>
          <ToggleButton value={Constants.CustomDateRange}>
            <Tooltip title={'Custom Date Range'}>
              <div>{Constants.CustomDateRange}</div> 
            </Tooltip>
          </ToggleButton>
        </ToggleButtonGroup>
  );
};

export default DateFilter;