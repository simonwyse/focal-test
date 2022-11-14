import React from "react";
import PropTypes from "prop-types";
import { ContentPageTemplate } from "../../templates/content-page";

const ContentPagePreview = ({ entry, widgetFor }) => (
  <ContentPageTemplate
    heading={entry.getIn(["data", "heading"])}
    content={widgetFor("body")}
  />
);

ContentPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default ContentPagePreview;
