import { Api } from '@/Api'

class FreelancersOps {
  getFreelancers() {
    return Api.get('/freelancers')
  }

  getOneFreelancer(id) {
    return Api.get('/freelancers/' + id)
  }

  createOneFreelancer(form) {
    return Api.post('/freelancers', {
      first_name: form.first_name,
      last_name: form.last_name,
      description: form.description,
      email_address: form.email_address,
      phone_number: form.phone_number,
      password: form.password
    })
  }

  deleteFreelancer(id) {
    return Api.delete('/freelancers/' + id)
  }
}

export default new FreelancersOps()
