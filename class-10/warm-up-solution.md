# Warm-Up Exercise

Read through this code as if you are the interpreter. Find all of the mistakes in this code and write down the correct syntax for each mistake.

## server.js

```js
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/username', (req, res) => {
  // try catch block ...
  const userInfo = {
    userInfo.email: req.query.email,
  };

  userInfo.name = req.query.username;
  userInfo.password = req.query.password;

  res.send(userInfo);
});

// error handling?

app.listen(PORT, () => `Listening on Port ${PORT}`);
```
