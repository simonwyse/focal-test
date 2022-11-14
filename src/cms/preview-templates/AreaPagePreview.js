import React from 'react'
import PropTypes from 'prop-types'
import { AreaPageTemplate } from '../../templates/area-page'

const AreaPagePreview = ({ entry }) => {

    const heading = entry.getIn(["data", "heading"])

    const entryBlurbs = entry.getIn(["data", "blurbs"])
    const blurbs = entryBlurbs ? entryBlurbs.toJS() : []

    const entryActivities = entry.getIn(["data", "activities"])
    const activities = entryActivities ? entryActivities.toJS() : []

    const showImages = entry.getIn(["data", "showImages"])

    return (
        <AreaPageTemplate
            heading={heading}
            blurbs={blurbs}
            showImages={showImages}
            activities={activities}
        />
    )
}

AreaPagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    })
}

export default AreaPagePreview