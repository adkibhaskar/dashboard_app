import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const HorizontalBarChart = ({data,labels}) => {
    console.log("The labels are : ",labels)
    const barData = {
        labels: labels,
        datasets: [
          {
            label:'Performance (%)',
            data: data,
            backgroundColor: 'skyblue',
            
          },
        ],
      };
      const options = {
        maintainAspectRatio:false,
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: (value) => `${value}%`,
              font:{
                size:9
              },
            },
            title: {
              display: true,
              text: 'Performance (%)',
            },
          },
          y: {
            ticks:{
                font: {
                    size: 9, 
                    },
            },
            title: {
              display: true,
              text: 'Groups',
             },
          },
        },
    };
    
  return (
    <div>
        <Bar data={barData} options={options}/>
    </div>
  )
}

export default HorizontalBarChart