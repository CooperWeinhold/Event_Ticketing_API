import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('<h2>Welcome to the Event Ticketing API 🚀</h2>');
});

export default router;
