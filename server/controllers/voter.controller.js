'use strict'

import Voter from '../models/voter'
import Candidate from '../models/candidate'

export default {

  Validate: async (req, res) => {

    let state = false

    try {

      const { identification } = req.query
      let find = await Voter.findOne({ identification })
      if (find === null) state = true
      res.status(200).send({ state })

    } catch (err) {
      res.status(404).send({ error: 'An error has ocurred' })
    }

  },

  Vote: async (req, res) => {

    try {

      const body = req.body
      let voter = await Voter.insertMany(body)

      await Candidate.findOneAndUpdate(
        { _id: voter[0].candidateVote },
        {
          $inc: { totalVote: 1 }
        },
        { new: true })

      res.status(200).send(voter[0])

    } catch (err) {
      res.status(404).send({ err })
    }

  }

}





