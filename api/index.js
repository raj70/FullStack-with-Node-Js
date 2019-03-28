import express from 'express';

/* create Router */
const router = express.Router();

/* lister for root */
router.get("/", (req, res) => {
    res.send({ data: [] });
});

/* export router as default component */
export default router;