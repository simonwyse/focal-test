import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import LinkButton from './LinkButton'

const Facilities = ({ data, view, facilities, promote }) => {
  const facilitiesList = facilities.markdownRemark.frontmatter.facilities.items
  // let newList = [];
  // if promote = true && item.promote = true, return item
  // if promote = false, return all items
  let filteredList = facilitiesList.filter(item => ((promote && item.promote) || !promote))
  return (
    <section className={`section facilities facilities--${view} ${view === 'compact' ? 'px-0' : ''}`}>
      <h2 className="section__title is-separator">
        <span>{data.heading}</span>
      </h2>
      <div className="section__content">
        <div className={`facilities__content`}>
          {filteredList.map(item => (
            <div className={`facility facility--${view} facility__${item.name}`} key={item.name}>
              <p className="facility__description">{item.description}</p>
            </div>
          ))}
        </div>
        {view === 'extended' && (
          <div className="section__button">
            <LinkButton to="/lodge" text="Read more" />
          </div>
        )}
      </div>
    </section>
  )
}

export default ({data, view, promote}) => (
  <StaticQuery
    query={graphql`
      query FacilitiesTemplate {
        markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
          frontmatter {
            facilities {
              items {
                name
                description
                promote
              }
            }
          }
        }
      }
    `}
    render={(facilities) => <Facilities data={data} view={view} promote={promote} facilities={facilities} />}
  />
)