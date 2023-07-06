
// course Creation Time formatter
export const formatTime = (inputTime) => {
  const date = new Date(inputTime);
  
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC'
  };
  
  const formattedTime = new Intl.DateTimeFormat('en-US', options).format(date);
  
  return formattedTime;
}


// Total duration of course
export const courseDuration = (section) => {
  
  const totalSeconds = section.reduce((acc,section) => 
    acc + section.subsection.reduce((acc,subsec) => 
      acc + parseInt(subsec.timeDuration), 0
    ),0
  )

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  
  return {
    hours: hours,
    minutes: minutes
  };
}


// total section duration
export const sectionDuration = (subsection) => {
  const totalSeconds = subsection.reduce((acc,subsec) => 
      acc + parseInt(subsec.timeDuration), 0
    )

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  
  return {
    hours: hours,
    minutes: minutes
  };
}