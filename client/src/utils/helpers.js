// Validates if the given string is in email format
export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Checks if the password meets a specific pattern: 
// starts with a letter, followed by 7 to 14 alphanumeric characters
export function checkPassword(input) {
  const passw = /^[A-Za-z]\w{7,14}$/;
  if (input.match(passw)) {
    return true;
  }
  return false;
}
