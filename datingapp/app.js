const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/about', function (req, res) {
    res.send('doei World!')
  })

  app.get('*', (req, res) => {
        res.status(404).send("404 NOT FOUND");
  });

 
app.listen(port, () => console.log(`Example app listening on port ${port}!`))