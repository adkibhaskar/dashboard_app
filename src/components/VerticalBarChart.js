import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const VerticalBarChart = ({graphData,graphLabels}) => {
  
  const data={
    labels: graphLabels,
    datasets: [
        {
          label:"Number of Employees",
          data: graphData,
          backgroundColor: 'skyblue',
          borderWidth: 0.5,
        },
    ],
}
const options = {
  maintainAspectRatio:false,
  scales: {
    y: {
      ticks: {
        stepSize: 50, 
        beginAtZero: true,
      },
      title:{
        display:true,
        text:"Number of Employees"
      }
    },
    x:{
      title:{
        display:true,
        text:"Age Group"
      }
    },
  },
};

  return (
    <div>
   <Bar data={data} options={options}/>
    </div>
  )
}

export default VerticalBarChart




