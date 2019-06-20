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