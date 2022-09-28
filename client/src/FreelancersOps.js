import { Api } from '@/Api'

class FreelancersOps {
  getFreelancers() {
    return Api.get('/freelancers')
  }

  getOneFreelancer() {
    return Api.get('/freelancers/:id')
  }
}

export default new FreelancersOps()
