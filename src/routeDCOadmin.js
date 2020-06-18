import React from 'react';

const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/Base/Cards'));
const Carousels = React.lazy(() => import('./views/Base/Carousels'));
const Collapses = React.lazy(() => import('./views/Base/Collapses'));
const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'));
const Forms = React.lazy(() => import('./views/Base/Forms'));
const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base/Navbars'));
const Navs = React.lazy(() => import('./views/Base/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'));
const Switches = React.lazy(() => import('./views/Base/Switches'));
const Tables = React.lazy(() => import('./views/Base/Tables'));
const Tabs = React.lazy(() => import('./views/Base/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons'));
const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const Gant = React.lazy(() => import('./views/Gant/Gant'));
//DC SITE
const DCSiteForm = React.lazy(() => import('./views/Inventory/DC Site/FormComponent'));
const DCSiteList = React.lazy(() => import('./views/Inventory/DC Site/ListDCSite'));
const DCSiteCreate = React.lazy(() => import('./views/Inventory/DC Site/CreateSite'));
const DCSiteEdit = React.lazy(() => import('./views/Inventory/DC Site/EditSite'));
//DC LOCATION
const DCLocForm = React.lazy(() => import('./views/Inventory/DC Location/FormComponent'));
const DCLocList = React.lazy(() => import('./views/Inventory/DC Location/ListDCLocation'));
const DCLocCreate = React.lazy(() => import('./views/Inventory/DC Location/CreateDCLocation'));
const DCLocEdit = React.lazy(() => import('./views/Inventory/DC Location/EditDCLocation'));
//DC Rack
const RackForm = React.lazy(() => import('./views/Inventory/Rack/FormComponent'));
const RackList = React.lazy(() => import('./views/Inventory/Rack/ListRack'));
const RackCreate = React.lazy(() => import('./views/Inventory/Rack/CreateRack'));
const RackEdit = React.lazy(() => import('./views/Inventory/Rack/EditRack'));
//DC NETWORK BANDWIDTH
const NEBandwidthForm = React.lazy(() => import('./views/Inventory/Network Bandwidth/FormComponent'));
const NEBandwidthList = React.lazy(() => import('./views/Inventory/Network Bandwidth/ListBandwidth'));
const NEBandwidthCreate = React.lazy(() => import('./views/Inventory/Network Bandwidth/CreateBandwidth'));
const NEBandwidthEdit = React.lazy(() => import('./views/Inventory/Network Bandwidth/EditBandwidth'));
//DC NETWORK PORT
const NEPortForm = React.lazy(() => import('./views/Inventory/Network Bandwidth/FormComponent'));
const NEPortList = React.lazy(() => import('./views/Inventory/Network Bandwidth/ListBandwidth'));
const NEPortCreate = React.lazy(() => import('./views/Inventory/Network Bandwidth/CreateBandwidth'));
const NEPortEdit = React.lazy(() => import('./views/Inventory/Network Bandwidth/EditBandwidth'));
//DC UPS
const UPSForm = React.lazy(() => import('./views/Inventory/UPS/FormComponent'));
const UPSList = React.lazy(() => import('./views/Inventory/UPS/ListUPS'));
const UPSCreate = React.lazy(() => import('./views/Inventory/UPS/CreateUPS'));
const UPSEdit = React.lazy(() => import('./views/Inventory/UPS/EditUPS'));
//DC PDU
const PDUForm = React.lazy(() => import('./views/Inventory/PDU/FormComponent'));
const PDUList = React.lazy(() => import('./views/Inventory/PDU/ListPDU'));
const PDUCreate = React.lazy(() => import('./views/Inventory/PDU/CreatePDU'));
const PDUEdit = React.lazy(() => import('./views/Inventory/PDU/EditPDU'));
//DC CRAC
const CRACForm = React.lazy(() => import('./views/Inventory/CRAC/FormComponent'));
const CRACList = React.lazy(() => import('./views/Inventory/CRAC/ListCRAC'));
const CRACCreate = React.lazy(() => import('./views/Inventory/CRAC/CreateCRAC'));
const CRACEdit = React.lazy(() => import('./views/Inventory/CRAC/EditCRAC'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/inventory', exact: true, name: 'Inventory', component: DCSiteForm },
  //dc site
  { path: '/dcSite', name: 'DC Site', component: DCSiteForm },
  { path: '/dcSiteListAll', name: 'DC Site List', component: DCSiteList },
  { path: '/dcSiteCreate', name: 'DC Site', component: DCLocCreate },
  { path: '/dcSiteEdit/:id', name: 'DC Site', component: DCSiteEdit },
  //dc location
  { path: '/dcLocation', name: 'DC Location', component: DCLocForm },
  { path: '/dcLocationListAll', name: 'DC Location List', component: DCLocList },
  { path: '/dcLocationCreate', name: 'DC Location', component: DCSiteCreate },
  { path: '/dcLocationEdit/:id', name: 'DC Location', component: DCLocEdit },
  //rack
  { path: '/rackForm', name: 'Rack Form', component: RackForm },
  { path: '/rackListAll', name: 'Rack List', component: RackList },
  { path: '/rackCreate', name: 'Rack', component: RackCreate },
  { path: '/rackEdit/:id', name: 'Rack', component: RackEdit },
  //NETWORK BANDWIDTH
  { path: '/BandwidthForm', name: 'Bandwidth Form', component: NEBandwidthForm },
  { path: '/BandwidthListAll', name: 'Bandwidth List', component: NEBandwidthList },
  { path: '/BandwidthCreate', name: 'Bandwidth', component: NEBandwidthCreate },
  { path: '/BandwidthEdit/:id', name: 'Bandwidth', component: NEBandwidthEdit },
  //NETWORK PORT
  { path: '/NEPortForm', name: 'NEPort Form', component: NEPortForm },
  { path: '/NEPortListAll', name: 'NEPort List', component: NEPortList },
  { path: '/NEPortCreate', name: 'NEPort', component: NEPortCreate },
  { path: '/NEPortEdit/:id', name: 'NEPort', component: NEPortEdit },
  //UPS
  { path: '/UPSForm', name: 'UPS Form', component: UPSForm },
  { path: '/UPSListAll', name: 'UPS List', component: UPSList },
  { path: '/UPSCreate', name: 'UPS', component: UPSCreate },
  { path: '/UPSEdit/:id', name: 'UPS', component: UPSEdit },
  //PDU
  { path: '/PDUForm', name: 'PDU Form', component: PDUForm },
  { path: '/PDUListAll', name: 'PDU List', component: PDUList },
  { path: '/PDUCreate', name: 'PDU', component: PDUCreate },
  { path: '/PDUEdit/:id', name: 'PDU', component: PDUEdit },
  //CRAC
  { path: '/CRACForm', name: 'CRAC Form', component: CRACForm },
  { path: '/CRACListAll', name: 'CRAC List', component: CRACList },
  { path: '/CRACCreate', name: 'CRAC', component: CRACCreate },
  { path: '/CRACEdit/:id', name: 'CRAC', component: CRACEdit },

  { path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', exact: true, name: 'Base', component: Cards },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/gant', exact: true,  name: 'Gant', component: Gant },
];

export default routes;
