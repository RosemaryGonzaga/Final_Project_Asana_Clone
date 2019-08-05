// helper function for TaskShow and SectionShow components
export const timeAgoFormatted = (timeDiffInMS) => {
    if (timeDiffInMS > 86400000) {          // format in days
        let timeDiffInDays = timeDiffInMS / 86400000;
        let days = Math.floor(timeDiffInDays) === 1 ? 'day' : 'days';
        return `${Math.floor(timeDiffInDays)} ${days} ago`;
    } else if (timeDiffInMS > 3600000) {    // format in hours
        let timeDiffInHours = timeDiffInMS / 3600000;
        let hours = Math.floor(timeDiffInHours) === 1 ? 'hour' : 'hours';
        return `${Math.floor(timeDiffInHours)} ${hours} ago`;
    } else if (timeDiffInMS > 60000) {      // format in minutes
        let timeDiffInMinutes = timeDiffInMS / 60000;
        let minutes = Math.floor(timeDiffInMinutes) === 1 ? 'minute' : 'minutes';
        return `${Math.floor(timeDiffInMinutes)} ${minutes} ago`;
    } else {
        return 'Just now';
    }
}


export const MONTHS = [
    "Jan", "Feb", "Mar", 
    "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", 
    "Oct", "Nov", "Dec"
];


const DAYS_OF_WEEK = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];


const isLeapYear = year => {
    if (year % 4 === 0) {
        if (year % 400 === 0) {  // The year is also evenly divisible by 400. Then it is a leap year.
            return true;
        } else if (year % 100 === 0) {  // If the year can be evenly divided by 100, it is NOT a leap year (unless divisible by 400)
            return false;
        } else {  // Otherwise, if the year is divisible by 4, it is generally a leap year.
            return true;
        }
    }
    // Reference: https://www.timeanddate.com/date/leapyear.html
}


const daysPerMonthInYear = year => {
    const daysinFeb = isLeapYear(year) ? 29 : 28;
    return [
        31, daysinFeb, 31,
        30, 31, 30,
        31, 31, 30,
        31, 30, 31
    ];
}


export const formatRelativeDate = date => {
    // If no due date, return an empty string
    if (!date) {
        return "";
    }

    // If there is a due date, format it relative to today's date
    // Helper variables
    const today = new Date();

    const dueDate = date.getDate();
    const dueMonth = date.getMonth();
    const dueYear = date.getFullYear();

    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    let taskDueYesterday = false;
    let taskDueToday = false;
    let taskDueTomorrow = false;

    const timeDiff = Date.parse(date) - Date.parse(today);
    // debugger
    if (dueYear === todayYear && dueMonth === todayMonth && dueDate === todayDate) {
        taskDueToday = true;
    } else if (timeDiff > -172800000 && timeDiff < 172800000) { // narrow the time window to +/- almost two full days
        const daysPerMonth = daysPerMonthInYear(todayYear);
        // debugger
        if (todayDate === daysPerMonth[todayMonth]) {   // Today is the last day of the month.
            if (dueDate - todayDate === -1) {
                taskDueYesterday = true;
            } else if (dueDate === 1 && dueMonth === todayMonth + 1) { // check if due date is first day of next month (tomorrow)
                taskDueYesterday = true;
            }
        } else if (todayDate === 1) {   // Today is the first day of the month.
            if (dueDate - todayDate === 1) {
                taskDueTomorrow = true;
            } else if (dueDate === daysPerMonth(todayMonth - 1)) { // check if due date is last day of previous month (yesterday)
                taskDueYesterday = true;
            }
        } else {    // Today is neither the first nor the last day of the month.
            if (dueDate - todayDate === -1) {
                taskDueYesterday = true;
            } else if (dueDate - todayDate === 1) {
                taskDueTomorrow = true;
            }
        }
    }

    // Return the formatted date
    if (taskDueYesterday) {         // Yesterday
        return "Yesterday";
    } else if (taskDueToday) {      // Today
        return "Today";
    } else if (taskDueTomorrow) {   // Tomorrow
        return "Tomorrow";
    } else if (timeDiff > 0 && timeDiff < 604800000 && date.getDay() !== today.getDay()) {   
        // Any time in the next 7 days --> Day of week ("Wednesday")
        return DAYS_OF_WEEK[date.getDay()];
    } else {                        // More than a week from now OR Before yesterday --> Mmm/DD
        return `${MONTHS[dueMonth]} ${dueDate}`;
    }
    
    // const taskDueToday = (dueDate === today.getDate() &&
    //                       dueMonth === today.getMonth() &&
    //                       dueYear === today.getFullYear());
}