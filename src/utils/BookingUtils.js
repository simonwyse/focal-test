import JSONData from "../data/availability.json";
import PricingJSON from "../data/pricing.json";
import CottagesJSON from "../data/cottages.json";
import { MyMoment, ParseMyMoment } from "./MomentUtils";
import { DateUtils, ModifiersUtils } from "react-day-picker";

const WEEKLY = "weekly";
const MIDWEEK = "midweek";
const WEEKEND = "weekend";
const EXTRA = "extra"
const NIGHTLY = "nightly"

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
]

export const MATRIX = {
  3: [1, 2, 3], // m, t, w
  4: [1, 2, 3], // m, t, w
  5: [1, 5], // m, f
  6: [1, 2], // m, t,
  7: [6], // sa
  8: [5, 6], // f. sa
  9: [5, 6, 0], // f, sa, su
  10: [5], // f
  11: [5, 6], // f, sa
  12: [6], // sa
  13: [6, 0], // sa, su
  14: [6], // sa
  21: [5, 6], // f, sa
};


export default class BookingUtils {
  constructor() {
    this.enabled = CottagesJSON.enabled;
    this.priceData = this.enabled ? CottagesJSON : PricingJSON
    this.datesBandsPrices = {}  
    this.bookedDates = this.getBookedDates()
    this.lastDateOfRange = this.getLastDateOfRange()
    this.monthYearOptions = this.getMonthYearOptions()
  }

  /**
   * Return a string in the format duration-date-month-year
   * Use as a key to access band and price info for a given combination of date and duration
   * 
   * @param {Date} day 
   * @returns {String} 
   */
  createKey(day) {
    return `${this.duration}-${day.getDate()}-${day.getMonth() + 1}-${day.getFullYear()}`
  }

  /**
   * Add a date/duration combo to the global list
   * 
   * @param {Date} day 
   * @param {Object} band 
   */
  addToGlobalList(day, band) {
    let key = this.createKey(day);
    if (!this.datesBandsPrices[key]) {
      this.datesBandsPrices[key] = {
        band: band,
        price: null,
      }
    }
  }

  /**
   * Remove an entry from the global list
   * 
   * @param {Date} day 
   */
  deleteFromGlobalList(day) {
    delete this.datesBandsPrices[this.createKey(day)];
  }

  /**
   * Loop over availability data and return array of dates 
   * that are now or in the future
   *
   * @return {Array}
   */
  getBookedDates() {
    return JSONData.dates.flatMap((date) => {
      return ParseMyMoment(date.to).isBefore(MyMoment())
        ? []
        : this.createRangeOfDates(
            ParseMyMoment(date.from).toDate(),
            ParseMyMoment(date.to).toDate()
          )
    })
  }

  /**
   * Create array of valid months / year for the month drop down
   * Only include from now until lastDateOfRange
   * 
   * @returns {Array} 
   */
  getMonthYearOptions() {
    let date = MyMoment().date(1), // Set to 1st of current month / year
      monthAndYears = []

    while(date.isSameOrBefore(this.lastDateOfRange, 'month')) {
      monthAndYears.push({ 
        "name": MONTHS[date.month()], 
        "month": date.month(), 
        "year": date.year() 
      })
      date.add(1, 'M')
    }

    return monthAndYears
  }

  /**
   * Return if we're selecting the first day
   * 
   * @param {Date} from 
   * @param {Date} to 
   * @param {Date} day 
   * @returns {Boolean}
   */
  isSelectingFirstDay(from, to, day) {
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from)
    const isRangeSelected = from && to
    return !from || isBeforeFirstDay || isRangeSelected
  }

  /**
   * Filter an array of Dates for the unavailable modifier
   * 
   * @param {Array} range
   * @returns {Array}
   */
  filterUnavailableDays(range) {
    return range.filter((day) =>
      ModifiersUtils.getModifiersForDay(day, {
        unavailable: this.bookedDates,
      }).some((el) => el === "unavailable")
    )
  }

  /**
   * Return array of dates between start and end dates
   * 
   * @param {Date} start 
   * @param {Date} end 
   * @returns {Array}
   */
  createRangeOfDates(start, end) {
    let range = [],
      day = start

    while (MyMoment(day).isSameOrBefore(end)) {
      range.push(day)
      day = MyMoment(day).add(1, "d").toDate()
    }

    return range
  }

  /**
   * For all of the dates in the price range, find the last one
   * They may not be in order, so compare next with the last one
   * 
   * @returns {Moment}
   */
  getLastDateOfRange() {
    let lastDate = MyMoment()

    this.priceData.dates.forEach((band) => {
      const from = ParseMyMoment(band.from)
      const to = ParseMyMoment(band.to)

      if (from.isAfter(lastDate, "day")) {
        lastDate = from
      }
      if (to.isAfter(lastDate, "day")) {
        lastDate = to
      }
    })

    return lastDate
  }
  
  /**
   * Returns an array of days from start to end, for a given month
   * Add the current day to the global list of data
   * 
   * @param {Object} band 
   * @param {Date} month 
   * @param {Integer} duration 
   * @returns {Array}
   */
  createRangeOfDatesForMonth(band, month, duration) {
    let range = [],
      day = ParseMyMoment(band.from),
      endDay = ParseMyMoment(band.to)

    while (day.isSameOrBefore(endDay)) {
      if (
        day.month() === month.getMonth() &&
        day.year() === month.getFullYear()
      ) {
        range.push(day.toDate())
        this.addToGlobalList(day.toDate(), band, duration)
      }
      day.add(1, "d")
    }

    return range
  }

  /**
   * Return an array of dates for the selected month and duration
   * This is then applied to the calendar as a modifier to highlight valid start dates
   *  
   * @param {Date} month 
   * @param {Integer} duration 
   * @returns {Array} 
   */
  getStartingDates(month, duration) {
    // If !enabled, return empty array
    if (!this.enabled) return []

    // Get array of days from bands matching month && year range
    const daysOfRange = this.priceData.dates.flatMap((band) => {
      let days = this.createRangeOfDatesForMonth(band, month, duration)
      return days.length ? days : []
    })

    // Keep only days which match the start matrix for duration
    // Return true to keep, false to remove
    const startDays = daysOfRange.filter(day => {
      let d = MyMoment(day)

      // Process future days that are included in the matrix, for duration
      if( d.isSameOrAfter(MyMoment(), 'day') && MATRIX[duration].includes(d.day()) ) {
        // Create a range for this stay: from start day, plus duration
        let range = { from: day, to: d.add(duration, 'd').toDate() }

        // Remove the date if ANY of the unavailable dates are found in the range from the start date
        // Are any of the unavailable days, found within this range? If true, return false to remove from array
        if (!this.bookedDates.some(date => DateUtils.isDayInRange(date, range))) {
        
          // Determine if this day is found within the inclusions for this duration
          const included = this.priceData.inclusions.flatMap(({from, to, durations}) => {
            let thisDuration = durations.includes(parseInt(duration))
            let range = {
              from: ParseMyMoment(from).toDate(),
              to: ParseMyMoment(to).toDate(),
            }

            return (DateUtils.isDayInRange(day, range) && !thisDuration) ? range : []
          })

          // If the inclusions result is not empty, i.e, the day is found between one of the included ranges..
          // return false, to remove from the array
          // Otherwise, create the price for this day
          if (!included.length) {
            // Create the price for the day
            let key = this.createKey(day, duration)
            let range = this.createRangeOfDates(day, MyMoment(day).add(duration, 'd'))
            this.datesBandsPrices[key].price = this.getCottagesPrice(range, this.datesBandsPrices[key].band) 

            // Keep date in return result
            return true
          }
        }
      }

      // The day is not a start day, so remove from the global list
      this.deleteFromGlobalList(day, duration)
      return false
    })

    return startDays
  }

  /**
   * Native get price for the given range
   * 1. which band is each date present in? => array of each band : ["high", "mid"]
   * 2. for each band, how many dates does it cover? => [{high: 2}, {mid: "4"}]
   * 3. for each band, find the price for the number of days => [{high: 2, price: 300}, {mid: 4, price: 400}]
   * 4. Sum each price key => 300 + 400 = total 700, return total
   * 
   * @param {Array} range 
   * @returns {Integer}
   */
  getPrice(range) {
    // Remove the last item, so length == number of nights
    range.pop() 

    // Find the price band for each date within this range
    let bandsInThisRange = [],
      counter = {},
      totalPrice = 0

    range.forEach((date, i) => {
      this.priceData.dates.map((priceBand, i) => {

        let bandFrom = ParseMyMoment(priceBand.from),
            bandTo = ParseMyMoment(priceBand.to)

        return MyMoment(date).isBetween(bandFrom, bandTo, 'day', '[]') ? bandsInThisRange.push(priceBand.band) : false
      })
    })

    // Now get the number of days each band covers within the range, e.g. {high: 4, mid: 3}
    for (let i of bandsInThisRange) {
      counter[i] = (counter[i] || 0) + 1
    }

    // Calculate the total price - sum price for all bands
    for (let band in counter) {
      let activeBand = this.priceData.bands.filter((obj) => obj.id === band)[0]
      let numberOfNights = counter[band]
      let priceForThisBand = 0
      let priceKey = range.length >= 7 ? EXTRA : NIGHTLY

      priceForThisBand += numberOfNights * activeBand[priceKey]
      totalPrice += priceForThisBand
    }
    
    return totalPrice
  }

  /**
   * Cottages price
   * 
   * @param {Array} range 
   * @param {Object} bandObj 
   * @returns {Integer}
   */
  getCottagesPrice(range, bandObj) {
    
    let numberOfNights = range.length, // Number of nights
      firstDayOfStay = range[0].getDay(), // First day - 0 Sun, 1 Mon etc.
      // Prices for this date range
      bandPrices = this.priceData.bands.filter((obj) => obj.id === bandObj.band)[0],

      priceKey = WEEKLY, // Key for which price, or rate, if 4 or less days. Defaults to weekly,
      numberOfFullWeeks = 0, // Number of full weeks in the selected range
      numberOfRemainingDays, // Number of remaing days, e.g 12 nights == 1 week and 5 days
      remainderRate, // Rate / multiplier to use for the remainind days
      totalPrice // Total price

    if (numberOfNights >= 5) {
      // 5 nights or more, use the weekly price
      numberOfFullWeeks = Math.floor(numberOfNights / 7)
      numberOfRemainingDays = numberOfNights % 7
    }
    else {
      // Less than 5 nights
      // If first day is Thu - Sun, use weekend price
      // If first day is Mon - Wed, use midweek price
      // These prices will probably always be the same, but the rate is 120% for 4 nights @ weekend, 
      // so helps to separate these, as we can use the key for this special rate as well
      numberOfRemainingDays = numberOfNights;
      priceKey = [4, 5, 6, 0].includes(firstDayOfStay) ? WEEKEND : MIDWEEK
    }

    // let rate = rates[numberOfFullWeeks]
    // Apply the rate to the remaining days - weekly rate if >= 5 nights, otherwise weekend / midweek
    remainderRate = numberOfRemainingDays > 0 ? this.priceData.rates[priceKey][numberOfRemainingDays] : 0
    
    // TotalPrice = weely price (number of full weeks * week price) + price for remainder (rate * band price)
    totalPrice = (numberOfFullWeeks * bandPrices[WEEKLY]) + (remainderRate * bandPrices[priceKey])

    return Number.isInteger(totalPrice) ? totalPrice : totalPrice.toFixed(2)
  }
}