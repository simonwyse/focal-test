import CMS from 'netlify-cms-app'
// import uploadcare from 'netlify-cms-media-library-uploadcare'
// import cloudinary from 'netlify-cms-media-library-cloudinary'

// import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import ProductPagePreview from './preview-templates/ProductPagePreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'

import BookingPagePreview from "./preview-templates/BookingPagePreview";
import LodgePagePreview from "./preview-templates/LodgePagePreview"
import AreaPagePreview from "./preview-templates/AreaPagePreview"
import ParkPagePreview from "./preview-templates/ParkPagePreview"
import LocationPagePreview from "./preview-templates/LocationPagePreview"
import ContentPagePreview from "./preview-templates/ContentPagePreview"
import FaqPagePreview from "./preview-templates/FaqPagePreview";

// CMS.registerMediaLibrary(uploadcare)
// CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate('index', IndexPagePreview)
// CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('products', ProductPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)

CMS.registerPreviewTemplate("booking", BookingPagePreview)
CMS.registerPreviewTemplate("lodge", LodgePagePreview)
CMS.registerPreviewTemplate('area', AreaPagePreview)
CMS.registerPreviewTemplate("park", ParkPagePreview)
CMS.registerPreviewTemplate("location", LocationPagePreview)
CMS.registerPreviewTemplate("privacy", ContentPagePreview)
CMS.registerPreviewTemplate("terms", ContentPagePreview)
CMS.registerPreviewTemplate("about", ContentPagePreview)
CMS.registerPreviewTemplate("faq", FaqPagePreview);