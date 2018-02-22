export function formatTimeDisplay(seconds) {
    // ~~ is equivalent to Math.floor
    // Hours, minutes and seconds
    const hrs = ~~(seconds / 3600);
    const mins = ~~((seconds % 3600) / 60);
    const secs = Math.round(seconds % 60);

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + (secs === 60 ? "00": secs);
    return ret;
}