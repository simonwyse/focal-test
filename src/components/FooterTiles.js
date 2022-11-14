import React from 'react'
import { Location } from '@reach/router'
import { graphql, StaticQuery, Link } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import ArrowRightIcon from '../img/icons/icon-angle-right.inline.svg'

class FooterTiles extends React.Component {

  constructor(props) {
    super(props)

    this.layoutConfig = {
      default: ['lodge', 'park', 'booking'],
      park: ['lodge', 'area', 'booking'],
      lodge: ['booking', 'park', 'area'],
      area: ['lodge', 'park', 'booking'],
      booking: ['lodge', 'park', 'area']
    }
  }

  getSequence(location) {
    const { data } = this.props
    const { tiles } = data.markdownRemark.frontmatter.footertiles
    let layout = this.layoutConfig
    let items = Object.entries(layout)

    let order = items[0][1] // default ordering
    items.forEach(item => {
      let key = item[0]
      let value = item[1]
      if (location.pathname.match(key)) {
        order = value
      }
    })

    let sequence = []
    order.forEach(item => {
      tiles.forEach(tile => {
        if (tile.name === item) sequence.push(tile)
      })
    });

    return sequence
  }

  render() {
    return (
      <div className="footer-tiles has-bg-dark-turquoise-005">
        <div className="container-fluid">
          <section className="section px-0">
            <div className="section__content">

              <Location>
                {({ location }) => (
                  <div className="footer-tiles__container">
                    {this.getSequence(location).map((tile) => {
                      return (
                        <div key={tile.name} className="footer-tile">
                          <Link to={`/${tile.link}`} className="footer-tile__link">
                            <div className="footer-tile__img">
                              <PreviewCompatibleImage
                                imageInfo={{
                                  image: tile.image
                                }}
                              />
                            </div>
                            <div className="footer-tile__title">{tile.title}
                              <ArrowRightIcon className="icon-arrow-right footer-tile__icon" />
                            </div>
                          </Link>
                        </div>
                    )})}
                  </div>
                )}
              </Location>

            </div>
          </section>
        </div>
      </div>
    )
  }
}

//export default FooterTiles

export default () => (
  <StaticQuery
    query={graphql`
      query FooterTilesTemplate {
        markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
          frontmatter {
            footertiles {
              tiles {
                name
                title
                link
                image {
                  childImageSharp {
                    fluid(maxWidth: 640, quality: 75) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => <FooterTiles data={data} />}
  />
)