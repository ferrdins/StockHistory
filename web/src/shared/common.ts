export interface Column {
  id: 'date' | 'open' | 'high' | 'low' | 'close' | 'adjclose' | 'volume';
  label: string;
  align?: 'right';
}

export interface History {
  _id: string,
  Date: string,
  Open: string,
  High: string,
  Low: string,
  Close: string,
  "Adj Close": string,
  Volume: string
}

export interface DataCount {
  count: string
}

export interface HistoryProps {
  symbolId: string,
  startDt: string,
  endDt: string
}

export interface SymbolInfo {
  _id: string,
  symbol: string,
  companyName: string
}

export interface DateRange {
  handleCustomDt: Function,
  changeFromDt: Function,
  changeToDt: Function
}

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})
}