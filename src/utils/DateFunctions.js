export function DateArray(start, end) {
    for (var arr = [], dt = new Date(end); dt >= new Date(start); dt.setDate(dt.getDate() - 1)) {
        arr.push(new Date(dt));
    }
    return arr;
};

export function compareToday(date) {
    const today = new Date();
    if (
        today.getFullYear() === date.getFullYear() &&
        today.getMonth() === date.getMonth() &&
        today.getDate() === date.getDate()
    ) {
        return true;
    }
    return false;
}

export function compareDates(date1, date2) {
    if (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
        // date1.getTime() === date2.getTime()
    ) {
        return true;
    }
    return false;
}

export function beforeDate(date1, date2) {
    if (
        date1.getTime() < date2.getTime()
    ) {
        return true;
    }
    return false;
}