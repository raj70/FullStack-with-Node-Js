import express from 'express';

import data from '../src/testData';

/* create Router */
const router = express.Router();

/* lister for root */
router.get("/contests", (req, res) => {
    res.send({ data: data.contests });
});

/* export router as default component */
export default router;