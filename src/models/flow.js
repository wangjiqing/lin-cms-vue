import { get } from 'lin/plugins/axios'

class Flow {
  async getFlowList() {
    return get('v1/flow')
  }
}

export default new Flow()
