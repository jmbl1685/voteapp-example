'use strict'

import Candidate from '../models/candidate'
import Voter from '../models/voter'

export default {

  AddCandidate: async (req, res) => {

    try {

      const { matchName, candidateName, matchImg, candidateImg } = req.body

      let candidate = await Candidate.insertMany(req.body)

      res.status(200).send(candidate[0])

    } catch (err) {

    }

  },

  GetCandidate: async (req, res) => {

    try {

      let totalVoter = await Voter.find({})

      var candidateList = await Candidate.find({})

      candidateList.forEach(item => {
        let porcentage = (100 * item.totalVote) / totalVoter.length
        item.set('porcentage', isNaN(porcentage) ? 0 : porcentage, { strict: false })
      })
      res.status(200).send(candidateList)

    } catch (err) {
      res.status(404).send({ err })
    }

  }

}





