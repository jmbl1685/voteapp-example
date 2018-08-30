'use strict'

import candidateController from '../controllers/candidate.controller'

export default (app) => {

  app.post('/api/candidate', candidateController.AddCandidate)
  app.get('/api/candidate', candidateController.GetCandidate)

}

