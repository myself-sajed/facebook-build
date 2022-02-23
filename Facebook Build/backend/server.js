const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const PORT = 4000;
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { json } = require('express');
app.use(json())

app.post('/generateToken', (req, res) => {
    const { username, password } = req.body
    const token = jwt.sign({ username, password }, 'FACEBOOKBYSAJED');
    res.send({ message: 'success', token })

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
