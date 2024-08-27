import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, plugins } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const HorizontalBarChart = ({data,labels}) => {
    console.log("The labels are : ",labels)
    const barData = {
        labels: labels,
        datasets: [
          {
            label:'Performance (%)',
            data: data,
            backgroundColor: '#00a2ff',
            
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
              stepSize:10,
              callback: (value) => `${value}%`,
              font:{
                size:9
              },
            },
          },
          y: {
            grid:{
              display:false,
            },
            ticks:{
                font: {
                    size: 10, 
                    },
            },
          },
        },
        plugins:{
          legend:{
            display:false
          }
        }
    };
    
  return (
    <div>
        <Bar data={barData} options={options}/>
    </div>
  )
}

export default HorizontalBarChart