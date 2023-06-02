import express, { urlencoded, json } from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import cors from 'cors';

const app = express();

const SECRET_KEY = 'MARQUEE_SECRET_KEY';

app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
app.use(
  json()
  );
app.post('/api/login', [
  body('username').trim().isLength({ min: 1 }),
  body('password').trim().isLength({ min: 1 }),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, password } = req.body;

  if (username === 'narendra' && password === '123456') {
    const token = sign({ username }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
