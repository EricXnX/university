const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const tweetApi = require('./tweets/tweetApi');
const authApi = require('./users/login_regsiter/authApi');
const homePageApi = require('./users/homepage/homePageApi')

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// 使用推文相关的API
app.use('/tweets', tweetApi);

// 使用用户相关的API
app.use('/users', authApi);
app.use('/users', homePageApi);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

