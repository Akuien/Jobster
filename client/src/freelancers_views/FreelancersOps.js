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

  updateFreelancer(id, body) {
    return Api.patch('/freelancers/' + id, body)
  }

  getResumes(id) {
    return Api.get('/freelancers/' + id + '/resumes')
  }

  createResume(id, body) {
    return Api.post('/freelancers/' + id + '/resumes', body)
  }

  deleteResume(freelancerId, resumeId) {
    return Api.delete('/freelancers/' + freelancerId + '/resumes/' + resumeId)
  }
}

export default new FreelancersOps()
