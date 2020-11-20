// import iView from 'iview'
import iView from 'view-design'
import 'view-design/dist/styles/iview.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
// import locale from 'iview/dist/locale/zh-CN'
import locale from 'view-design/dist/locale/zh-CN'
import conf from '../../conf'

import Buttonx from './Buttonx.vue'
import DatePickerx from './DatePickerx.vue'
import DateRangeSearchPickerx from './DateRangeSearchPickerx.vue'
import Formx from './Formx.vue'
import Inputx from './Inputx.vue'
import Modalx from './Modalx.vue'
import Selectx from './Selectx.vue'
import Tablex from './Tablex.vue'
import InputNumberx from './InputNumberx.vue'
import IpAdressx from './IpAdressx.vue'
import Spinx from './Spinx.vue'
import DynamicTableInputx from './DynamicTableInputx.vue'
import CheckboxTableInputx from './CheckboxTableInputx.vue'

import './index.less'

export default {
  install (Vue) {
    iView.Notice.config({
      duration: conf.noticeKeep
    })

    iView.Message.config({
      duration: conf.messageKeep
    })

    Vue.use(iView, {
      locale
    })
    Vue.use(VueAwesomeSwiper, /* { default global options } */)
    Vue.component(Buttonx.name, Buttonx)
    Vue.component(DatePickerx.name, DatePickerx)
    Vue.component(DateRangeSearchPickerx.name, DateRangeSearchPickerx)
    Vue.component(Formx.name, Formx)
    Vue.component(Inputx.name, Inputx)
    Vue.component(Modalx.name, Modalx)
    Vue.component(Selectx.name, Selectx)
    Vue.component(Tablex.name, Tablex)
    Vue.component(InputNumberx.name, InputNumberx)
    Vue.component(IpAdressx.name, IpAdressx)
    Vue.component(Spinx.name, Spinx)
    Vue.component(DynamicTableInputx.name, DynamicTableInputx)
    Vue.component(CheckboxTableInputx.name, CheckboxTableInputx)
  }
}
