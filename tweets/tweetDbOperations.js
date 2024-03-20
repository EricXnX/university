

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/social_media/tweet', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
const db = mongoose.connection;

const Tweet = mongoose.model('Tweet', {
    tweetid: String,
    userid: String,
    content: String
});

// 创建推文函数
async function createTweet(userid, content) {
    try {
        if (!content) {
            throw new Error('推文内容不能为空');
        }
        const newTweet = new Tweet({ userid, content });
        await newTweet.save();
        return newTweet;
    } catch (error) {
        throw new Error(error.message);
    }
}

// 获取用户的推文函数
async function getUserTweets(userid) {
    try {
        const userTweets = await Tweet.find({ userid });
        if (!userTweets || userTweets.length === 0) {
            throw new Error('用户没有推文');
        }
        return userTweets;
    } catch (error) {
        throw new Error(error.message);
    }
}

// 获取所有推文函数
async function getAllTweets() {
    try {
        const allTweets = await Tweet.find();
        if (!allTweets || allTweets.length === 0) {
            throw new Error('没有推文');
        }
        return allTweets;
    } catch (error) {
        throw new Error(error.message);
    }
}

// 根据关键字查询推文函数
async function getTweetsByKeyword(keyword) {
    try {
        const tweetsByKeyword = await Tweet.find({ content: { $regex: keyword, $options: 'i' } });
        if (!tweetsByKeyword || tweetsByKeyword.length === 0) {
            throw new Error('没有匹配的推文');
        }
        return tweetsByKeyword;
    } catch (error) {
        throw new Error(error.message);
    }
}

// 删除推文函数
async function deleteTweet(tweetid) {
    try {
        await Tweet.findByIdAndDelete(tweetid);
    } catch (error) {
        throw new Error(error.message);
    }
}

// 更新推文函数
async function updateTweet(tweetid, content) {
    try {
        if (!content) {
            throw new Error('推文内容不能为空');
        }
        const updatedTweet = await Tweet.findByIdAndUpdate(tweetid, { content }, { new: true });
        if (!updatedTweet) {
            throw new Error('推文不存在');
        }
        return updatedTweet;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { createTweet, getUserTweets, getAllTweets, getTweetsByKeyword, deleteTweet, updateTweet };