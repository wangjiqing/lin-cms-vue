import { get, post, put } from 'lin/plugins/axios'

class Flow {
  async getFlowList() {
    return get('v1/flow')
  }

  async addContentToFlow(index, type, art_id, status) {
    return post('v1/flow', { index, type, art_id, status })
  }

  async editFlow(id, index, type, art_id, status) {
    return put(`v1/flow/${id}`, { index, type, art_id, status })
  }
}

export default new Flow()
