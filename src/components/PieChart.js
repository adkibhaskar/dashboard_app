import React from 'react';
import {Chart,registerables} from "chart.js";
import { Doughnut } from 'react-chartjs-2';
Chart.register(...registerables)

const PieChart = ({graphData,labels}) => {
  const generateRandomColors=(numColors)=>{
    let colors=[];
    for(let i=0;i<numColors;i++){
      const color=`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random() * 256)})`
      colors.push(color)
    }
    return colors
  }
  const chartData={
    labels : labels,
    datasets:[
      {
        data:graphData,
        backgroundColor:['blue','yellow','green'],
      }
    ]
  }
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, 
    width: '100%',
    height: 200, 
    plugins: {
      legend: {
        position: 'right',
      },
    }
  };
  return (
  <div className='d-flex flex-column'>
    <Doughnut data={chartData} options={chartOptions}/>
    </div>
    
  )
}
export default PieChart;

