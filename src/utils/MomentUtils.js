import moment from 'moment'

const DATE_FORMAT = 'Do MMM YYYY'

/**
 * Parse a moment date string with a given format
 * 
 * @export
 * @param {String} date 
 * @returns 
 */
export function ParseMyMoment(date) {
    return moment(date, DATE_FORMAT)
}

/**
 * Wrapper to create a moment object
 * So we don't import moment everywhere
 * 
 * @param {Date} args 
 * @returns 
 */
export function MyMoment(args) {
    return moment(args)
}