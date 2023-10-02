const express = require('express');
const cors = require('cors');
const Pusher = require('pusher');
const app = express();

const pusher = new Pusher({
  appId: '1680321',
  key: '8b98eea4023b4790c6cd',
  secret: 'e4bb533882ca467e09b3',
  cluster: 'ap2',
  useTLS: true,
});

app.use(cors());
app.use(express.json());

app.post('/api/messages', async (req, res) => {
  try {
    const { username, message } = req.body;

    // Trigger the message via Pusher
    await pusher.trigger('chat', 'message', {
      username,
      message,
    });

    // Respond with a success message or the message data
    const responseMessage = 'Message sent successfully'; // Modify as needed
    res.json({ message: responseMessage });
  } catch (error) {
    // Handle any errors here
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing the request' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
