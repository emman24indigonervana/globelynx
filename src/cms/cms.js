import CMS from 'netlify-cms'

import HomePagePreview from './preview-templates/HomePagePreview'
import AboutPagePreview from './preview-templates/AboutPagePreview'
import NewsPostPreview from './preview-templates/NewsPostPreview'
import ProductsPagePreview from './preview-templates/ProductsPagePreview'
import ExpertsPagePreview from './preview-templates/ExpertsPagePreview'
import CamerasPagePreview from './preview-templates/CamerasPagePreview'
import CamerasDetailsPreview from './preview-templates/CamerasDetailsPreview'
import ContactPagePreview from './preview-templates/ContactPagePreview'

CMS.registerPreviewTemplate('home', HomePagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('products', ProductsPagePreview)
CMS.registerPreviewTemplate('news', NewsPostPreview)
CMS.registerPreviewTemplate('experts', ExpertsPagePreview)
CMS.registerPreviewTemplate('cameras', CamerasPagePreview)
CMS.registerPreviewTemplate('camerasDetails', CamerasDetailsPreview)
CMS.registerPreviewTemplate('contact', ContactPagePreview)
