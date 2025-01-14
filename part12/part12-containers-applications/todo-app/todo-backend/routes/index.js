const express = require('express');
const router = express.Router();
const configs = require('../util/config');
const { getAsync, setAsync } = require('../redis');

/* GET index data. */
router.get('/', async (req, res) => {
  const visits = (await getAsync('visits')) || 0; // Recupera visitas desde Redis
  const updatedVisits = parseInt(visits) + 1;

  await setAsync('visits', updatedVisits); // Actualiza visitas en Redis

  res.send({
    ...configs,
    visits: updatedVisits,
  });
});

module.exports = router;
