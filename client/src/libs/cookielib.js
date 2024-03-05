// Jeff Cuartas & Nate Novak
// CS5610: Final Project
// Function library for reading and writing cookies

// Function to parse the stored cookies
// Returns dictionary of name-value-pairs of the cookie stored
// Shameless stolen from: https://www.30secondsofcode.org/js/s/parse-cookie

export const parseCookies = (str) => {
  if (str === "") {
    return { "": "" };
  }

  str
    .split(";")
    .map((kvp) => kvp.split("="))
    .reduce((acc, kvp) => {
      acc[decodeURIComponent(kvp[0].trim())] = decodeURIComponent(
        kvp[1].trim()
      );
      return acc;
    }, {});
};

// Function to write a cookie to the document
// Paramters: the name of the cookie, the value, and the time to expiration in days
export function writeCookie(key, value, time2exp) {
    let expstr = ''; 
    if(time2exp) {
        let date = new Date(); 
        let expdate = date.getDate(); 
        date.setDate(expdate + time2exp); 
        let expstr = date.toUTCString(); 
    }

  document.cookie = `${key}=${value}; expires=${expstr}`;
}
