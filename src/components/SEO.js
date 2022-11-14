import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { withPrefix } from 'gatsby'
import useSiteMetadata from './SiteMetadata'

const SEO = ({ title, description, image, pathname, article }) => {

    const site = useSiteMetadata()

    const { titleTemplate,
             defaultTitle, 
             defaultDescription, 
             siteUrl, 
             defaultImage 
        } = site

    const seo = {
        title: title || null,
        description: description || defaultDescription,
        image: `${siteUrl}${image || defaultImage}`,
        url: `${siteUrl}${pathname || '/'}`
    }

    return (
        <>
            <Helmet title={seo.title} titleTemplate={titleTemplate} defaultTitle={defaultTitle}>
                <html lang="en" />
                <meta name="description" content={seo.description} />
                <meta name="theme-color" content="#B2CFD7" />
                <meta name="image" content={seo.image} />

                {seo.title && <meta property="og:title" content={seo.title} />}
                {seo.url && <meta property="og:url" content={seo.url} />}
                {seo.description && <meta property="og:description" content={seo.description} />}
                {seo.image && <meta property="og:image" content={seo.image} />}
                <meta property="og:type" content="business.business" />

                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href={`${withPrefix('/')}img/apple-touch-icon.png`}
                />
                <link
                    rel="icon"
                    type="image/png"
                    href={`${withPrefix('/')}img/favicon-32x32.png`}
                    sizes="32x32"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href={`${withPrefix('/')}img/favicon-16x16.png`}
                    sizes="16x16"
                />

                <link
                    rel="mask-icon"
                    href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
                    color="#000000"
                />
            </Helmet>
        </>
    )
}

export default SEO

SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    pathname: PropTypes.string,
    article: PropTypes.bool,
}

SEO.defaultProps = {
    title: null,
    description: null,
    image: null,
    pathname: null,
    article: false,    
}