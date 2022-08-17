export function convertDate(date) {
    let aux = date.split('T')[0].replaceAll('-', '/')
    const [year, month, day] = aux.split('/');
    return day + '/' + month + '/' + year
}

export function reConvertDate(date) {
    let aux = date.replaceAll('/', '-')
    const [year, month, day] = aux.split('-');
    let newDay = (parseInt(day) + 1).toString()
    let newDate = year + '-' + month + '-' + newDay
    return new Date(newDate)
}

export function reConvertDate2(date) {
    let aux = date.replaceAll('/', '-')
    const [day, month, year] = aux.split('-');
    let newDay = (parseInt(day) + 1).toString()
    let newDate = year + '-' + month + '-' + newDay
    return new Date(newDate)
}

