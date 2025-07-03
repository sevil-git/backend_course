// The address of the server connected to the network is
// URL -> http://localhost:8383 
// IP -> 127.0.0.1 
const express = require('express');
const app = express();
const PORT = 8383;

// HTTP verbs && Routes (or Paths) 

app.get('/', (req, res) => {
    console.log("Yay I hit an endpoint!", req.method);
    res.sendStatus(200);
})

app.get('/dashboard', (req, res) => {
    console.log("Ohhhh Now I'm listening on /dashboard");
    res.send("HIII");
})
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));