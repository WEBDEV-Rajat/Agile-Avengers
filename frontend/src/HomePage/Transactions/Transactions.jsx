import React, {useState} from 'react'
import Navigationbar from '../Navigationbar';
import { Chart } from "react-google-charts";
import "./Transactions.css";  

const Analysis = () => { 
  const data = [
    ["Month", "Income", "Expenses"],
    ["January", 1000, 400],
    ["February", 1170, 460],
    ["March", 1260, 620],
    ["April", 1030, 540],
    ["May", 1530, 600],
    ["June", 1030, 800],
    ["July", 1260, 650],
    ["August", 1090, 730],
    ["September", 1350, 580],
    ["October", 1750, 770],
    ["November", 1280, 890],
    ["December", 1100, 430],

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
