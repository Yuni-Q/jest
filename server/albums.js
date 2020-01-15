const express = require('express');
const cors = require('cors');
const albumData = require('./albumData');
const app = express();

app.use(cors());

app.get('/albums', (req, res) => {
  const page = Number(req.query.page);
  const pageSize = Number(req.query.pageSize);
  const total = albumData.length;

  const startIdx = (pageSize * (page - 1))
  const endIdx = Math.min(startIdx + pageSize, total - 1);

  res.send({
    total,
    albums: albumData.slice(startIdx, endIdx)
  });
});

app.listen(3000, () => console.log('Board listening on port 3000!'))
