'use srict'

import mongoose from 'mongoose'

const voterModel = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  identification: {
    type: Number,
    required: true,
    unique: true
  },
  birthdate: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true
  },
  candidateVote:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true
  }
}, { versionKey: false })

export default mongoose.model('Voter', voterModel)