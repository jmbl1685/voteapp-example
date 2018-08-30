'use srict'

import mongoose from '../config/mongoose'

const candidateModel = new mongoose.Schema({
  matchName: {
    type: String,
    required: true
  },
  candidateName: {
    type: String,
    required: true
  },
  matchImg: {
    type: String
  },
  candidateImg: {
    type: String
  },
  totalVote: {
    type: Number,
    required: true,
    default: 0
  }
}, { versionKey: false })

export default mongoose.model('Candidate', candidateModel)