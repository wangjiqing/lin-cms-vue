import { get } from 'lin/plugins/axios'

class Content {
  async getContentList() {
    return get('v1/content')
  }
}

export default new Content()
