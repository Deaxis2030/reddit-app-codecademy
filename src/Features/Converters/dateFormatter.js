const dateFormatter = (data) => {
    const postTimestamp = data.created_utc;
    const currentTime = Date.now();
  
    // Convert seconds to milliseconds
    const postTime = postTimestamp * 1000;
  
    const millisecondsDifference = currentTime - postTime;
    const hoursDifference = millisecondsDifference / (1000 * 60 * 60);
  
    let output;
    if (hoursDifference < 24 && hoursDifference > 1) {
      output = `Posted: ${Math.floor(hoursDifference)} hrs. ago`;
    } else if (hoursDifference <= 1) {
      output = `Posted: ${Math.floor(hoursDifference)} hr. ago`;
    } else {
      // Convert the timestamp to a Date object
      const postDate = new Date(postTime);
      // Format the date to a readable string
      output = postDate.toLocaleDateString();
    }
  
    return output;
  };
  
export default dateFormatter;