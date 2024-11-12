import React, {useState} from 'react'
import Navigationbar from '../Navigationbar';
import { Chart } from "react-google-charts";
import "./Transactions.css";  

const Analysis = () => { 
  const data = [
    ["Year", "Sales", "Expenses"],
    ["2014", 1000, 400],
    ["2015", 1170, 460],
    ["2016", 660, 1120],
    ["2017", 1030, 540],
  ];
  
  return (
    <>
     <Navigationbar/>
    <div className="main-container">
     <h1>Analysis</h1>
     <Chart
      chartType="Bar"
      height="400px"
      data={data}
    />
    </div>
    </>
  )
}

export default Analysis;
