import React from "react";
import PropTypes from "prop-types";
import { BookingPageTemplate } from "../../templates/booking-page";

const BookingPagePreview = ({ entry, widgetFor }) => (
  <BookingPageTemplate
    heading={entry.getIn(["data", "heading"])}
    markup={widgetFor("body")}
  />
);

BookingPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default BookingPagePreview;
