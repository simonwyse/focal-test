import React from 'react'
import { useForm } from 'react-hook-form'
import { navigate } from 'gatsby-link'
import { withPrefix } from 'gatsby'
import Availabilty from '../../components/Availability'
import ExternalLinkIcon from '../../img/icons/icon-external-link.inline.svg'


function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const BookingForm = props => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  return (
    <section className="section px-0 section--thin">
      <form
        name="booking"
        method="post"
        action="/booking/thanks/"
        onSubmit={handleSubmit(props.onSubmit)}
        noValidate
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >

        <input type="hidden" name="form-name" value="booking" />
        <input type="hidden" name="fromDate" value={props.state.from ? props.state.from.toLocaleDateString() : ''} readOnly />
        <input type="hidden" name="toDate" value={props.state.to ? props.state.to.toLocaleDateString() : ''} readOnly />
        <input type="hidden" name="price" value={props.state.price} readOnly />

        <div hidden>
          <label>
            Don’t fill this out:{' '}
            <input name="bot-field" onChange={props.handleChange} />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor={'name'}>Your name</label>
          <input
            type={'text'}
            id={'name'}
            {...register('name', { required: true })}
            onChange={props.handleChange}
            className={errors.name ? 'form-control error' : 'form-control'}
          />
          {errors.name && <div className="form-control-error">Please enter your name</div>}
        </div>

        <div className="form-group">
          <label htmlFor={'email'}>Email</label>
          <input
            type={'email'}
            id={'email'}
            {...register('email', { required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
            onChange={props.handleChange}
            className={errors.email ? 'form-control error' : 'form-control'}
            placeholder={'someone@email.com'}
          />
          {errors.email && <div className="form-control-error">Please enter an email address</div>}
          <small className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>

        <div className="form-group">
          <label htmlFor={'message'}>Message</label>
          <textarea
            id={'message'}
            {...register('message', { required: true })}
            onChange={props.handleChange}
            className={`form-control ${errors.message ? 'error' : ''}`}
            placeholder="Tell us about your party, how many people, children?"
            style={{ height: '200px' }}
          />
          {errors.message && <div className="form-control-error">Please enter a brief message</div>}
        </div>

        <div className="form-group">
          <div className="form-check">
            <input
              type={'checkbox'}
              id={'terms'}
              {...register('terms', { required: true })}
              onChange={props.handleChange}
              className={`form-check-input ${errors.terms ? 'error' : ''}`}
            />
            <label className="form-check-label" htmlFor={'terms'}>Please indicate your have read the <a href={`${withPrefix('/')}booking/terms`} target="_blank" rel="noopener noreferrer">Booking Terms & Conditions<ExternalLinkIcon className="icon icon--inline icon-opener" /></a> </label>
            {errors.terms && <div className="form-control-error">Please confirm you have read the booking terms and conditions</div>}
          </div>
        </div>
        <div className="form-group">
          <button
            className="btn btn-no-icon btn--wide btn--large"
            type="submit"
          >
            Submit
          </button>
        </div>

      </form>
    </section>
  )
}

export default class BookingIndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.handleDayClick = this.handleDayClick.bind(this)
    this.handleResetClick = this.handleResetClick.bind(this)
    this.handleStateData = this.handleStateData.bind(this)
    this.state = this.getInitialState()
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (data, e) => {

    const form = e.target
    const { to, from, name, email, message, terms, price } = this.state

    if (from === null || to === null) {
      this.setState({ errors: true })
      return false
    }

    this.setState({ errors: false })

    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
            'form-name': form.getAttribute('name'),
            'fromDate': from.toLocaleDateString(),
            'toDate': to.toLocaleDateString(),
            'name': name,
            'email': email,
            'message': message,
            'terms': terms,
            'price': price
        }),
    })
    .then(() => navigate(form.getAttribute('action')))
    .catch(error => alert(error))
  }

  getInitialState() {
    const loc = this.props.locationState
    const from = (loc && loc.from !== null && loc.from !== undefined)? new Date(loc.from) : null
    const to = (loc && loc.to !== null && loc.to !== undefined) ? new Date(loc.to) : null
    const duration = loc && loc.duration !== undefined ? loc.duration : 3 
    const month = loc && loc.month !== undefined ? new Date(loc.month) : from || new Date()

    return {
      from: from,
      to: to,
      errors: false,
      rangeIsAvailable: true,
      rangeHasMinOrMoreDays: true,
      price: (loc && loc.price) ? loc.price : false,
      duration: duration,
      month: month
    }
  }

  handleDayClick(state) {
    this.setState({
      ...state,
      errors: false,
    })
  }

  handleResetClick(e) {
    e.preventDefault()
    const { month, duration } = this.state 

    this.setState({
      ...this.getInitialState(),
      from: null,
      to: null,
      month,
      duration
    })
  }

  handleStateData(data) {
    this.setState(data)
  }

  render() {

    return (
      <section className="section">
        <div className="section__content">

          <Availabilty
            handleResetClick={this.handleResetClick}
            handleDayClick={this.handleDayClick}
            handleStateData={this.handleStateData}
            state={this.state}
          />

          <BookingForm
            state={this.state}
            onSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />

        </div>
      </section>
    )
  }
}
