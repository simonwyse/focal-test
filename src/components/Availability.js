import React from 'react'
import DayPicker from 'react-day-picker'
import UndoIcon from '../img/icons/icon-undo.inline.svg'
import BookingUtils, { MATRIX } from "../utils/BookingUtils";
import { MyMoment } from '../utils/MomentUtils'
import '../scss/daypicker.scss'

// Utils to do all the calculations
const CalendarUtils = new BookingUtils();

const SelectMonthYearDuration = props => {
  const selectedValue = `${props.month.getMonth()}-${props.month.getFullYear()}`

  return (
    <div className="DayPicker__options d-flex has-bg-dark-turquoise-005"> 
      <div>
        <label htmlFor="month-year" className="label">Start date:</label>
        <select onChange={props.onMonthYearChange} value={selectedValue} className="custom-select" id="month-year">
          { CalendarUtils.monthYearOptions.map(({name, month, year}, i) => (
              <option key={i} value={`${month}-${year}`}>{name} {year}</option>
            ))
          }
        </select>
      </div>

      <div>
        <label htmlFor="duration" className="label">Duration:</label>
          <select onChange={props.onDurationChange} value={props.duration} className="custom-select" id="duration">
            {Object.keys(MATRIX).map((key) => (
              <option key={key} value={key}>{key} nights</option>
            ))}
          </select>
      </div>
    </div>
  )
}

export default class Availability extends React.Component {
  constructor(props) {
    super(props)

    this.handleDayClick = this.handleDayClick.bind(this)
    this.handleDayClickNative = this.handleDayClickNative.bind(this);
    this.handleDayClickCottages = this.handleDayClickCottages.bind(this);
    this.handleMonthOnChange = this.handleMonthOnChange.bind(this);
    this.handleDurationOnChange = this.handleDurationOnChange.bind(this);
    this.handleMonthYearOnChange = this.handleMonthYearOnChange.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this)
    this.renderDay = this.renderDay.bind(this)
  }

  // Depending on cottages pricing, forward to appropriate handler
  // Set state
  handleDayClick(day, { disabled, booked, starting }) {
    if (disabled || booked || (!starting && CalendarUtils.enabled)) {
      return
    }
    
    let state = (CalendarUtils.enabled) ? this.handleDayClickCottages(day) : this.handleDayClickNative(day)
    this.props.handleDayClick(state)
  }

  // Handle click for native pricing
  handleDayClickNative(day) {
    const { from, to } = this.props.state
    let state = {}

    if (CalendarUtils.isSelectingFirstDay(from, to, day)) {

      // Selecting first day, check mindays available - 4 days (3 nights)
      let minDateRange = CalendarUtils.createRangeOfDates(day, MyMoment(day).add(3, 'd'))

      if (CalendarUtils.filterUnavailableDays(minDateRange).length) {
         // Not enough date between selected date and next unavailable date
        state = {
          from: null,
          to: null,
          rangeIsAvailable: false,
        }
      } else {
        // Enough days between selected and next unavailable date
        state = {
          from: day,
          to: null,
          rangeIsAvailable: true,
        }
      }

    } else {
      // Selecting second day, check if all dates are valid
      let selectedRange = CalendarUtils.createRangeOfDates(from, day)

      if (CalendarUtils.filterUnavailableDays(selectedRange).length) {
        state = {
          to: null,
          rangeIsAvailable: true,
        }
      } else {
        // Check if selected date now is >= min length
        if (MyMoment(day).diff(from, "days") < 3) {
          // minimum number of days not met
          state = {
            rangeIsAvailable: true,
            rangeHasMinOrMoreDays: false,
          }
        } else {
          // Enough days
          state = {
            to: day,
            rangeIsAvailable: true,
            rangeHasMinOrMoreDays: true,
            price: CalendarUtils.getPrice(selectedRange),
          }
        }
      }
    }

    return state
  }

  // Set state when day clicked for cottages
  handleDayClickCottages(day) {
    let duration = this.props.state.duration
    let key = CalendarUtils.createKey(day, duration)
    let state = {
      from: day,
      to: MyMoment(day).add(duration, "d").toDate(),
      rangeIsAvailable: true,
      rangeHasMinOrMoreDays: true,
      price: CalendarUtils.datesBandsPrices[key].price,
    }

    return state
  }

  // Handle click of reset button
  handleResetClick(e) {
    this.props.handleResetClick(e)
  }

  // Set state when duration dropdown changes
  handleDurationOnChange(e) {
    this.props.handleStateData({ duration: e.target.value })
  }
  
  // Set state when month / year dropdown changes
  handleMonthYearOnChange(e) {
    let dateValue = e.target.value.split('-')
    let month = new Date(dateValue[1], dateValue[0], 1) // Set Date to 1st of selected month / year

    this.props.handleStateData({ month: month })
  }

  // Set state when month navigation changes, will cause render, with new month
  handleMonthOnChange(month) {
    this.props.handleStateData({ month: month });
  }  

  // Custom render method for day
  renderDay(day) {   
    // Render price if cottages enabled
    const renderPrice = () => {
      if(CalendarUtils.enabled) {
        const key = CalendarUtils.createKey(day, this.props.state.duration)
        const price = CalendarUtils.datesBandsPrices[key]?.price || null
        const style = {
          fontSize: 12,
          fontWeight: 'bold'
        }
        
        return price ? (<div style={style}>£{ parseInt(price) }</div>) : null
      }

      return null
    }

    return (
      <div>
        <div>{day.getDate()}</div>
        { renderPrice() }
      </div>
    )
  }

  render() {

    const {
      from,
      to,
      errors,
      price,
      rangeIsAvailable,
      rangeHasMinOrMoreDays,
      duration,
      month
    } = this.props.state;

    const numberOfMonths = CalendarUtils.enabled ? 1 : 2
    const lastDateOfRange = CalendarUtils.lastDateOfRange.toDate()
    const bookedDates = CalendarUtils.bookedDates
    const startingDates = CalendarUtils.getStartingDates(month, duration)
    const modifiers = {
      start: from,
      end: to,
      selected: [from, { from, to }],
      disabled: [{ before: new Date(), after: lastDateOfRange }],
      starting: startingDates,
      booked: bookedDates
    }

    return (
      <div className={`DayPicker-container ${CalendarUtils.enabled ? 'cottages' : 'native'}`}>
        <div>
          {CalendarUtils.enabled && (
            <SelectMonthYearDuration
              onMonthYearChange={this.handleMonthYearOnChange}
              month={month}
              list={this.monthYearOptions}
              onDurationChange={this.handleDurationOnChange}
              duration={duration}
            />
          )}

          <DayPicker
            ref={(el) => (this.dayPicker = el)}
            numberOfMonths={numberOfMonths}
            modifiers={modifiers}
            onDayClick={this.handleDayClick}
            onMonthChange={this.handleMonthOnChange}
            fromMonth={new Date()}
            toMonth={lastDateOfRange}
            month={month}
            renderDay={this.renderDay}
          />
          <div className="DayPicker__footer d-flex flex-row align-items-center">
            {!CalendarUtils.enabled && (
              <small className="DayPicker__note">Minimum 3 nights.</small>
            )}
            <button
              className="btn btn--small DayPicker__reset"
              onClick={this.handleResetClick}
            >
              Reset <UndoIcon className="icon icon-undo" />
            </button>
          </div>
        </div>
        <div className="DayPicker__feedback">
          <div
            className={`alert alert-warning ${
              rangeIsAvailable && rangeHasMinOrMoreDays && !errors
                ? "d-none"
                : ""
            }`}
          >
            {!rangeIsAvailable && (
              <div>
                That date is not available for the first day. A minimum of 3
                nights is required.
              </div>
            )}
            {rangeIsAvailable && !rangeHasMinOrMoreDays && (
              <div>Please select a minimum of 3 nights.</div>
            )}
            {errors && <div>Please select both start and end dates.</div>}
          </div>

          {from && to && (
            <div className="DayPicker__selected">
              <div className="DayPicker__summary is-bright-blue">
                From{" "}
                <div className="DayPicker__summary-value is-grey">
                  {from.toLocaleDateString()}
                </div>
              </div>
              <div className="DayPicker__summary is-bright-blue">
                To{" "}
                <div className="DayPicker__summary-value is-grey">
                  {to.toLocaleDateString()}
                </div>
              </div>
              <div className="DayPicker__summary is-bright-blue">
                Price{" "}
                <div className="DayPicker__summary-value is-grey">£{price}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
