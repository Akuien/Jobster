import { Api } from '@/Api'

class FreelancersOps {
  getFreelancers() {
    return Api.get('/freelancers')
  }
}

export default new FreelancersOps()
