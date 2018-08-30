'use strict'

import voterController from '../controllers/voter.controller'

export default (app) => {

  app.get('/api/voter', voterController.Validate)
  app.post('/api/voter', voterController.Vote)

}

