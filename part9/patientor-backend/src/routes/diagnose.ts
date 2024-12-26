import express from 'express'
import diagnose from '../data/diagnoses'

const router = express.Router()

router.get('/', (_req, res) => {
  res.json(diagnose)
})

export default router