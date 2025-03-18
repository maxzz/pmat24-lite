export function printPrecitionTime(title: string) {
    const ms = performance.now().toLocaleString('en-US', timeFormat);
    console.log(`%c${title}: ${precitionTime()} ms: ${ms.split(',').at(-1)}`, 'color: magenta');
}

function precitionTime(): string {
    const timeStr = new Intl.DateTimeFormat("en-US", timeFormat).format(Date.now());
    return timeStr;
}

// const timeFormat: Intl.DateTimeFormatOptions = { hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits: 3 }; // '18:58:44.427'
// function TimeNowdebugStr(): string {
//     return new Date().toLocaleString('en-US', timeFormat);
// }

// const timeFormat: Intl.DateTimeFormatOptions = { hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits: 3 }; // '18:58:44.427'
const timeFormat: Intl.DateTimeFormatOptions = { hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' }; // '18:58:44.427'

function TimeNowdebugStr(): string {
    const time = performance.now();
    const timeStr = time.toLocaleString('en-US', timeFormat);

    console.log('TimeNowdebugStr', time);
    return new Date().toLocaleString('en-US', timeFormat);
}

function timeSince() {
    // const endTime = performance.now();
    // const timeElapsed = endTime - startTime;
    const timeElapsed = performance.now();

    const seconds = Math.floor((timeElapsed / 1000) % 60);
    const minutes = Math.floor((timeElapsed / (1000 * 60)) % 60);
    const hours = Math.floor((timeElapsed / (1000 * 60 * 60)) % 24);
    const milliseconds = Math.floor(timeElapsed % 1000);

    const formattedTime: string[] = [];

    if (hours > 0) {
        formattedTime.push(`${hours} hours`);
    }
    if (minutes > 0) {
        formattedTime.push(`${minutes} minutes`);
    }
    if (seconds > 0) {
        formattedTime.push(`${seconds} seconds`);
    }
    if (milliseconds > 0 || formattedTime.length === 0) {
        formattedTime.push(`${milliseconds} milliseconds`);
    }

    return formattedTime.join(', ');
}

////////////

    // get precision timer of milliseconds as human readable string
    // const timeStr = TimeUtils.dpTimeToShow(Date.now());
    // const timeStr = Date.now().toString();
    // const timeStr = new Date().toISOString();
    // const timeStr = new Date().toLocaleString('en-US', { timeZone: 'UTC', hour12: false });
    // const timeStr = new Date().toLocaleString('en-US', { timeZone: 'UTC', hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits: 3 });
    
    // get precision timer to show only current time minutes and milliseconds as human readable string
    // const timeStr = new Date().toLocaleString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits: 3 });
    // console.log('ContentEditorSelector render', {time: timeStr});


    // const timeStr = new Date().toLocaleString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits: 3 });


    // const time = performance.now();
    // const timeStr = time.toLocaleString('en-US', timeFormat);
    // console.log('ContentEditorSelector render', { time: timeStr }); // {time: '725,065.2'}
    // console.log('ContentEditorSelector render', { time: timeSince() });
