import { Api } from '@/Api'

class FreelancersOps {
  getFreelancers() {
    return Api.get('/freelancers')
  }

  getOneFreelancer(id) {
    return Api.get('/freelancers/' + id)
  }
}

export default new FreelancersOps()
