import { Api } from '@/Api'

class CompaniesOps {
  getCompanies() {
    return Api.get('/companies')
  }

  getOneCompany(id) {
    return Api.get('/companies/' + id)
  }

  getAllJobs(id) {
    return Api.get('/companies/' + id + '/job_posts')
  }
}

export default new CompaniesOps()
