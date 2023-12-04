import { get, post } from 'lin/plugins/axios'

class Content {
  async getContentList() {
    return get('v1/content')
  }

  async addContent(data) {
    return post('v1/content', { ...data })
  }
}

export default new Content()
