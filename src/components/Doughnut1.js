import React from 'react';
import {Chart,registerables} from "chart.js";
import { Doughnut } from 'react-chartjs-2';
Chart.register(...registerables)

const Doughnut1 = ({graphData,labels}) => {
  const chartData={
    labels : labels,
    datasets:[
      {
        data:graphData,
        backgroundColor:['#ffc070','#66bdff','#59deab','#e1b8ff'],
        borderWidth:0
      }
    ]
  }
  const chartOptions = {
    cutout: '50%',
    circumference: 360,
    responsive: true,
    maintainAspectRatio: false, 
    width: '75%',
    height: 400, 
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          font: {
            size: 10, 
          },
          boxWidth: 10, 
        },
        position: 'right',
      },
    }
  };
  return (
  <div className='d-flex flex-column mb-1 h-100'>
    <Doughnut data={chartData} options={chartOptions}/>
    </div>
    
  )
}
export default Doughnut1;
































































































