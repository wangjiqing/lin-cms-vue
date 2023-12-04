import { _delete, get, post, put } from 'lin/plugins/axios'

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

  async delContent(id, type) {
    return _delete(`v1/content/${id}`, { type })
  }
}

export default new Content()
