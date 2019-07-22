import Vue from 'vue'
import '../element-variables.scss'
import locale from 'element-ui/lib/locale/lang/en'
import {
  Pagination,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  Button,
  ButtonGroup,
  Popover,
  Form,
  FormItem,
  Alert,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Card,
  Rate,
  Carousel,
  CarouselItem,
  Divider,
  Image,
  Loading,
  MessageBox,
  Message,
  Notification
} from 'element-ui'

Vue.prototype.$ELEMENT = { locale }
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Popover)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Alert)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Progress)
Vue.use(Card)
Vue.use(Rate)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Divider)
Vue.use(Image)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
