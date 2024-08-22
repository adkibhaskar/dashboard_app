import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, plugins } from 'chart.js';
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
  plugins:{
    legend:{
     display:false,
    },
  },
  scales: {
    y: {
      max:200,
      beginAtZero:true,
      grid:{
        display:false,
      },
      ticks:{
        stepSize:50,
      },
      title:{
        display:true,
        text:"Number of Employees",
        font:{
          size:8
      }
      },
    },
    x:{
      grid:{
        display:false,
      },
      ticks:{
        font:{
          size:8
        }
      },
      title:{
        display:true,
        text:"Age Group",
        font:{
          size:7
        }
        
      }
    },
  },
};

  return (
    <div className='h-100'>
   <Bar data={data} options={options}/>
    </div>
  )
}

export default VerticalBarChart




