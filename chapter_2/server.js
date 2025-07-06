// The address of the server connected to the network is
// URL -> http://localhost:8383 
// IP -> 127.0.0.1 
const express = require('express');
const app = express();
const PORT = 8383;


const data = ["james"]

//middleware

app.use(express.json());
// HTTP verbs && Routes (or Paths) 

// Type 1 :- website endpointd (these endpoints are for sending back html and they typically come when a user enters a url in a browser)

app.get('/', (req, res) => {
    console.log("Yay I hit an endpoint!", req.method);
    res.send(`
        <body style="background-color: red;">
        <h1>Data:</h1>
            <p>${JSON.stringify(data)}</p>
            <a href="/dashboard">Dashboard</a>
        </body>
        <script>console.log("Hello")</script>
        `);
})

app.get('/dashboard', (req, res) => {
    console.log("Ohhhh Now I'm listening on /dashboard");
    res.send(`
        <body style="background-color: green;">
        <h1>Dashboard</h1>
            <a href="/">Home</a>
        </body>
        `);
})



//Type 2 :- API endpoints (non visual)

app.get('/api/data', (req, res) => {
    console.log("This is an API endpoint");
    res.status(599).send(data);

})

app.post('/api/data', (req, res) => {
    const newEntry = req.body;
    console.log(newEntry);
    data.push(newEntry.name)
    res.sendStatus(201);
})

app.delete('/api/data', (req, res) => {
    data.pop();
    console.log("We deleted an entry");
    res.sendStatus(203);
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));