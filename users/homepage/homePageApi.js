// homePageApi.js

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./homePagedbOperations');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// 获取个人主页信息
app.get('/home/:userid', async (req, res) => {
    const { userid } = req.params;

    try {
        const userProfile = await db.getUserProfile(userid);
        res.status(200).json({ message: '个人主页信息获取成功', userProfile });
    } catch (error) {
        res.status(404).json({ message: '用户不存在', error: error.message });
    }
});

// 更新个人主页信息
app.put('/home/:userid', async (req, res) => {
    const { userid } = req.params;
    const updatedProfile = req.body;

    try {
        const updatedUser = await db.updateUserProfile(userid, updatedProfile);
        res.status(200).json({ message: '个人主页信息更新成功', user: updatedUser });
    } catch (error) {
        res.status(400).json({ message: '个人主页信息更新失败', error: error.message });
    }
});

// 上传新的用户头像
app.post('/home/:userid/usericon', async (req, res) => {
    const { userid } = req.params;
    const { usericon } = req.body;

    try {
        const updatedUser = await db.uploadUserIcon(userid, usericon);
        res.status(200).json({ message: '用户头像上传成功', user: updatedUser });
    } catch (error) {
        res.status(400).json({ message: '用户头像上传失败', error: error.message });
    }
});

module.exports = app;
