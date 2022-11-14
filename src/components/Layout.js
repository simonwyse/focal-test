import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import SEO from './SEO'
import 'typeface-muli'
import '../scss/global.scss'

const TemplateWrapper = ({ children }) => {

  return (
    <div>
      <SEO />
      <Navbar />
      {children}
      <Footer/>
    </div>
  )
}

export default TemplateWrapper
