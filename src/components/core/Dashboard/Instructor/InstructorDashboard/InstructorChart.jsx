import React, { useState } from 'react'

import {Chart, registerables} from "chart.js"
import {Pie} from "react-chartjs-2"

Chart.register(...registerables);

const InstructorChart = ({courses}) => {

  const [currChart, setCurrChart] = useState("students");
  
    //functio to genertae random colors
    const getRandomColors = (numColors) => {
        const colors = [];
        for(let i=0; i<numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random()*256)},
            ${Math.floor(Math.random()*256)})`
            colors.push(color);
        }
        return colors;
    }

    //create data for chart displaying student info

    const chartDataForStudents = {
        labels: courses.map((course)=> course.courseName),
        datasets: [
            {
                data: courses.map((course)=> course.totalStudentsEnrolled),
                backgroundColor: getRandomColors(courses.length),
            }
        ]
    }


    //create data for chart displaying iincome info
    const chartDataForIncome = {
        labels:courses.map((course)=> course.courseName),
        datasets: [
            {
                data: courses.map((course)=> course.totalAmountGenerated),
                backgroundColor: getRandomColors(courses.length),
            }
        ]
    }


    //create options
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            // overriding the generateLabels function in the labels configuration of the legend
            generateLabels: function (chart) {
              const originalLabels = Chart.overrides.pie.plugins.legend.labels.generateLabels(chart);
              const maxLength = 25; // Maximum number of characters to display
    
              // Truncate labels longer than maxLength and add ellipsis
              originalLabels.forEach((label) => {
                if (label.text.length > maxLength) {
                  label.text = label.text.substring(0, maxLength) + '...';
                }
              });
              return originalLabels;
            },
          },
        },
      }
    }

  return (
    <div className='sm:w-[70%] bg-richblack-800 rounded-xl p-5 flex flex-col gap-3 my-auto'>
      <p className='text-3xl text-yellow-400 font-semibold'>Visualise</p>
      <div className='flex gap-x-5 px-4 text-richblack-200'>
        <button
          onClick={() => {
            setCurrChart("students")
          }}
          className={`${currChart === "students" ? "bg-yellow-50 text-richblack-900 px-2 py-1 rounded-lg font-semibold text-sm" : ""}  `}
        >
            Student
        </button>

        <button
          onClick={() => {
            setCurrChart("income")
          }}
          className={`${currChart === "income" ? "bg-yellow-50 text-richblack-900 px-2 py-1 rounded-lg font-semibold text-sm" : ""}  `}

        >
            Income
        </button>
      </div>
      <Pie 
        data={currChart === "students" ? chartDataForStudents : chartDataForIncome}
        options={options}
        />
    </div>
  )
}

export default InstructorChart
