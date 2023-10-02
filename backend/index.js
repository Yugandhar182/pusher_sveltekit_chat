const express = require('express')
const cors = require('cors')
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1680321",
  key: "8b98eea4023b4790c6cd",
  secret: "e4bb533882ca467e09b3",
  cluster: "ap2",
  useTLS: true
});

const app = express();

app.use(cors({
   
}))

app.use(express.json())

app.post('/api/messages', async (req, res) => {
    await pusher.trigger("chat", "message", {
        username: req.body.username,
        message: req.body.message
    });

    res.json([]);
})

console.log('listening to port 8000');
app.listen(8000)
