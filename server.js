import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/proxy', async (req, res) => {
  const target = req.query.url;
  if (!target) return res.status(400).send('url 쿼리 파라미터를 지정하세요.');
  try {
    const response = await fetch(target);
    const text = await response.text();
    res.set('Access-Control-Allow-Origin', '*');
    res.send(text);
  } catch (err) {
    res.status(500).send('프록시 중 에러 발생');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
