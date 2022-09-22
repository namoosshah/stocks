import React from 'react';
import { IgrFinancialChart } from 'igniteui-react-charts';
import { IgrFinancialChartModule } from 'igniteui-react-charts';
IgrFinancialChartModule.register();

const StockChart = ({ state }) => {
  return (
    <IgrFinancialChart
      width="100%"
      height="500px"
      chartType="candle"
      thickness={2}
      chartTitle={state.companyInfo.symbol}
      subtitle={state.companyInfo.assetType}
      yAxisMode="Numeric"
      dataSource={state.stockChartData} />
  );
}
export default StockChart;
