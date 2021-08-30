const dateInput = document.querySelector("#date-input");
const showBtn = document.querySelector("#show-btn");
const output = document.querySelector("#output");

//Reverse the given string
function reverseString(str) {
  var listOfChars = str.split("");
  var reverseListOfChar = listOfChars.reverse();
  var reverseString = reverseListOfChar.join("");
  return reverseString;
}

//Palindrome function
function isPalindrome(str) {
  var reverseStr = reverseString(str);
  return str === reverseStr;
}

function isStringPalindrome(str) {
  var reversedString = reverseString(str);
  return str === reversedString;
}

//Convert date to string
function dateToString(date) {
  var dateStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();
  return dateStr;
}

// Get date formats
function getAllDateFormats(date) {
  var dateStr = dateToString(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
  var dateArr = getAllDateFormats(date);
  var flag = false;

  for (var i = 0; i < dateArr.length; i++) {
    if (isPalindrome(dateArr[i])) {
      return true;
    }
  }
  return false;
}

//Leap Year Function
function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  } else {
    return false;
  }
}

function getNextDate(date) {
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  // Checks february, leap and non leap years
  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
    if (month > 12) {
      month = 1;
      year++;
    }
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  var counterNext = 0;
  var nextDate = getNextDate(date);

  while (1) {
    counterNext++;
    var isPalindromeDate = checkPalindromeForAllDateFormats(nextDate);
    if (isPalindromeDate) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [counterNext, nextDate];
}

//Function For pervious date panlindrome
function getPreviousDate(date) {
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  if (day < 1) {
    month--;
    day = daysInMonth[month - 1];
    if (month < 1) {
      day = 31;
      month = 12;
      year--;
    }
    if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    }
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function getPreviousPalindromeDate(date) {
  var counterPrev = 0;
  var previousDate = getPreviousDate(date);

  while (1) {
    counterPrev++;
    var isPalindromeDate = checkPalindromeForAllDateFormats(previousDate);
    if (isPalindromeDate) {
      break;
    }
    previousDate = getPreviousDate(previousDate);
  }
  return [counterPrev, previousDate];
}

//Function for Nearest Palindrome
function getNearestPalindrome(date) {
  var [counterPrev, previousDate] = getPreviousPalindromeDate(date);
  var [counterNext, nextDate] = getNextPalindromeDate(date);

  if (counterPrev < counterNext) {
    return [counterPrev, previousDate];
  } else {
    return [counterNext, nextDate];
  }
}

function clickHandler(e) {
  var bdayStr = dateInput.value;

  if (bdayStr !== "") {
    var dateList = bdayStr.split("-");
    var date = {
      day: Number(dateList[2]),
      month: Number(dateList[1]),
      year: Number(dateList[0]),
    };

    var isPalindrome = checkPalindromeForAllDateFormats(date);

    if (isPalindrome) {
      output.innerText = "Yay! your birthday is a palindrome!";
    } else {
      var [counter, nextDate] = getNearestPalindrome(date);
      output.innerText = `Your birthdate is not a Palindrome, Nearest Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}. You missed by ${counter} days.`;
    }
  } else {
    output.innerText = "Please enter a date";
  }
}

showBtn.addEventListener("click", clickHandler);
