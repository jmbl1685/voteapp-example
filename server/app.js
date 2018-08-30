'use strict'

import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(helmet())

require('./routes/voter.routes').default(app)
require('./routes/candidate.routes').default(app)

export default app

