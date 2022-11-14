import React from "react";
import PropTypes from "prop-types";
import { LodgePageTemplate } from "../../templates/lodge-page";

const LodgePagePreview = ({ entry, widgetFor }) => {

  const heading = entry.getIn(["data", "heading"])

  const entryBlurbs = entry.getIn(['data', 'blurbs'])
  const blurbs = entryBlurbs ? entryBlurbs.toJS() : []

  const entryCarousel = entry.getIn(["data", "carousel"])
  const carousel = entryCarousel ? entryCarousel.toJS() : []

  const entryFacilities = entry.getIn(['data', 'facilities'])
  const facilities = entryFacilities ? entryFacilities.toJS() : []

  const entryFloorplan = entry.getIn(["data", "floorplan"])
  const floorplan = entryFloorplan ? entryFloorplan.toJS() : []

  const accessibility = entry.getIn(["data", "accessibility", "heading"])
  
  return (
    <LodgePageTemplate
      heading={heading}
      blurbs={blurbs}
      carousel={carousel}
      facilities={facilities}
      floorplan={floorplan}
      accessibility={{
        heading: accessibility,
      }}
      markup={widgetFor("body")}
    />
  );
};

LodgePagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func
};

export default LodgePagePreview;
