// server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS so your frontend can call this backend
app.use(cors());

// Route: get player stats from EA API
app.get('/api/players', async (req, res) => {
  try {
    const response = await fetch(
      'https://proclubs.ea.com/api/fc/members/stats?platform=common-gen5&clubId=1275113',
      {
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.9',
        },
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: 'EA API error' });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Optional: proxy friendly matches endpoint
app.get('/api/friendlies', async (req, res) => {
  try {
    const response = await fetch(
      'https://proclubs.ea.com/api/fc/clubs/matches?matchType=friendlyMatch&platform=common-gen5&clubIds=1275113',
      {
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.9',
        },
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: 'EA API error' });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Optional root route
app.get('/', (req, res) => {
  res.send('Backend running! Use /api/players or /api/friendlies');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
