export function ConvertDate(date) {
    let aux = date.substr(0, date.indexOf('T')).replaceAll('-', '/')
    const [year, month, day] = aux.split('/');
    return day + '/' + month + '/' + year
}