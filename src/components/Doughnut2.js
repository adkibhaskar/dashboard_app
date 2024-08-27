import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {Chart,ArcElement,Tooltip,Legend} from "chart.js";
Chart.register(ArcElement,Tooltip,Legend);
  const Doughnut2 = ({graphData,labels,textData}) => {
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
      const options = {
        cutout: '50%',
        circumference: 360,
        responsive: true,
        maintainAspectRatio: false, 
        width: '75%',
        height: 400, 
        plugins: {
            textInside: {
                text: textData,
                color: '#606060',
                fontSize: 22,
               
            },
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
        },
    };
   
    Chart.register({
        id: 'textInside',
        afterDatasetsDraw: function (chart, _) {
            if(chart.config.type === 'doughnut'){
            const ctx = chart.ctx;
            const width = chart.width;
            const height = chart.height;
            const fontSize = options.plugins.textInside.fontSize;
            ctx.font = fontSize + 'px Arial';
            ctx.fillStyle = options.plugins.textInside.color;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const text = options.plugins.textInside.text;
            const textX = Math.round(width/3);
            const textY = Math.round(height/2);
            ctx.fillText(text, textX, textY);
            }
        }
    });
    return (
    <div className='d-flex flex-column mb-1 h-100'>
    <Doughnut data={chartData} options={options}/>
    </div>
  )
}
export default Doughnut2
