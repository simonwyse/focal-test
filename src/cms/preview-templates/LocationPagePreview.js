import React from "react";
import PropTypes from "prop-types";
import { LocationPageTemplate } from "../../templates/location-page";

const LocationPagePreview = ({ entry }) => {

  const heading = entry.getIn(["data", "heading"])

  const entryBlurbs = entry.getIn(['data', 'blurbs'])
  const blurbs = entryBlurbs ? entryBlurbs.toJS() : []

  const entryDirections = entry.getIn(["data", "directions"])
  const directions = entryDirections ? entryDirections.toJS() : []

  const entryPostal = entry.getIn(["data", "postal"])
  const postal = entryPostal ? entryPostal.toJS() : []

  return (
    <LocationPageTemplate
      heading={heading}
      blurbs={blurbs}
      directions={directions}
      postal={postal}
    />
  );
};

LocationPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  })
};

export default LocationPagePreview;
