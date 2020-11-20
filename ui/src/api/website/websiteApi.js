import qs from 'qs'
import $axios from '../$axios'

export default {
  logo (data) {
    return $axios({
      method: 'get',
      baseURL: '/cloudui/master/ws',
      url: '/logo/download?size=big',
      data: qs.stringify(data),
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
  }
}
