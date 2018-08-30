'use strict'

import mongoose from 'mongoose'

const host = {
  DEV: 'mongodb://localhost:27017/voteApp'
}

mongoose.Promise = global.Promise
mongoose.connect(host.DEV, { useNewUrlParser: true })
  .catch(err => winston.error('[ERROR MONGODB]', err))

export default mongoose