import React from 'react'
import Availabilty from './Availability'
import LinkButton from './LinkButton'

class AvailabilityCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleStateData = this.handleStateData.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      from: null,
      to: null,
      errors: false,
      rangeIsAvailable: true,
      rangeHasMinOrMoreDays: true,
      price: false,
      duration: 3,
      month: new Date(),
    }
  }

  handleDayClick(state) {
    this.setState(state);
  }

  handleResetClick(e) {
    e.preventDefault()
    const { month, duration } = this.state

    this.setState({
      ...this.getInitialState(),
      duration,
      month
    })
  }

  handleStateData(data) {
    this.setState(data);
  }

  render() {
    const bookingPageState = {
      from: this.state.from ? this.state.from.toString() : null,
      to: this.state.to ? this.state.to.toString() : null,
      price: this.state.price,
      duration: this.state.duration,
      month: this.state.month
    };

    return (
      <section className="section ">
        <h2 className="section__title is-separator">
          <span>{this.props.booking.heading}</span>
        </h2>
        <div className="section__content">
          <p>{this.props.booking.description}</p>

          <Availabilty
            handleResetClick={this.handleResetClick}
            handleDayClick={this.handleDayClick}
            handleStateData={this.handleStateData}
            state={this.state}
          />
        </div>
        <div className="section__button">
          <LinkButton
            to="/booking/"
            text="Booking enquiry"
            state={bookingPageState}
          />
        </div>
      </section>
    );
  }
}

export default AvailabilityCalendar
