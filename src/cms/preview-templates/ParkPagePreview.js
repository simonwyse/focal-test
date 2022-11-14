import React from "react";
import PropTypes from "prop-types";
import { ParkPageTemplate } from "../../templates/park-page";

const ParkPagePreview = ({ entry, widgetFor }) => {

  const heading = entry.getIn(["data", "heading"])

  const image = entry.getIn(["data", "image"])

  const entryFacilities = entry.getIn(["data", "facilities"])
  const facilities = entryFacilities ? entryFacilities.toJS() : []

  const golfmap = entry.getIn(["data", "golfmap"])

  return (
    <ParkPageTemplate
      heading={heading}
      image={image}
      markup={widgetFor("body")}
      facilities={facilities}
      golfmap={golfmap}
    />
  );
};

ParkPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func
};

export default ParkPagePreview;
