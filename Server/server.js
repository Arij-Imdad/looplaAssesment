import express from 'express'
import cors from "cors";
import events from './events.js'

const app = express()
app.use(cors());
app.use(express.json());



app.get("/api/events", (req, res) => {
    res.send(events);
});

app.post("/api/events", (req, res) => {
    console.log("Received data:", req.body);
    res.status(200).json({ message: "Event received!" });
});

// Or restrict to specific origin
app.use(cors({
    origin: "http://localhost:3000",  // React app URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));


 const port = process.env.PORT|| 8080


app.listen(port, ()=> {
    console.log(`Server at http://localhost:${port}`)
})