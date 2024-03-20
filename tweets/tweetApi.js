// tweetApi.js

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./tweetDbOperations');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// 发送推文
app.post('/tweets', async (req, res) => {
    const { userid, content } = req.body;

    try {
        const newTweet = await db.createTweet(userid, content);
        res.status(201).json({ message: '推文发送成功', tweet: newTweet });
    } catch (error) {
        res.status(400).json({ message: '推文发送失败', error: error.message });
    }
});

// 获取特定用户的推文
app.get('/tweets/:userid', async (req, res) => {
    const { userid } = req.params;

    try {
        const userTweets = await db.getUserTweets(userid);
        res.status(200).json({ message: '用户推文获取成功', tweets: userTweets });
    } catch (error) {
        res.status(404).json({ message: '用户不存在或没有推文', error: error.message });
    }
});

// 查询所有推文
app.get('/tweets', async (req, res) => {
    try {
        const allTweets = await db.getAllTweets();
        res.status(200).json({ message: '所有推文获取成功', tweets: allTweets });
    } catch (error) {
        res.status(404).json({ message: '没有推文', error: error.message });
    }
});

// 根据关键字查询推文
app.get('/tweets/search', async (req, res) => {
    const { keyword } = req.query;

    try {
        const tweetsByKeyword = await db.getTweetsByKeyword(keyword);
        res.status(200).json({ message: '根据关键字查询推文成功', tweets: tweetsByKeyword });
    } catch (error) {
        res.status(404).json({ message: '没有匹配的推文', error: error.message });
    }
});

// 删除推文
app.delete('/tweets/:tweetid', async (req, res) => {
    const { tweetid } = req.params;

    try {
        await db.deleteTweet(tweetid);
        res.status(200).json({ message: '推文删除成功' });
    } catch (error) {
        res.status(400).json({ message: '推文删除失败', error: error.message });
    }
});

// 更新推文
app.put('/tweets/:tweetid', async (req, res) => {
    const { tweetid } = req.params;
    const { content } = req.body;

    try {
        const updatedTweet = await db.updateTweet(tweetid, content);
        res.status(200).json({ message: '推文更新成功', tweet: updatedTweet });
    } catch (error) {
        res.status(400).json({ message: '推文更新失败', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
