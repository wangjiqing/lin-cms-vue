import { get, post, put } from 'lin/plugins/axios'

class Content {
  async getContentList() {
    return get('v1/content')
  }

  async addContent(data) {
    return post('v1/content', { ...data })
  }

  async editContent(id, data) {
    return put(`v1/content/${id}`, { ...data })
  }
}

export default new Content()
