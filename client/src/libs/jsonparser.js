// Jeff Cuartas & Nate Novak
// CS5610: Final Project
// Fall 2022
// library for parsing json

// Function to handle error
// Ought to be more flushed out at a later time
export const handleError = err => {
  console.log(err); 
}

// Function to check the status of the API call
export const checkStatus = response => {
  if(!response.ok) {
    throw Error('Error in request: ' + response.statusText); 
  }
  return response; 
}

// Function to process response of fetch
export const processResponse = data => {
  return JSON.stringify(data[0])
}
