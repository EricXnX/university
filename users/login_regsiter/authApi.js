// authApi.js

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./authDbOperations'); // 导入数据库操作模块

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// 用户注册
app.post('/register', async (req, res) => {
    const { userid, username, password, email, nickname } = req.body;
    
    try {
        // 调用数据库操作模块中的注册函数
        const user = await db.registerUser(username, password, email, nickname);
        res.status(201).json({ message: '注册成功', user });
    } catch (error) {
        res.status(400).json({ message: '注册失败', error: error.message });
    }
});

// 用户登录
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        // 调用数据库操作模块中的登录函数
        const user = await db.loginUser(username, password);
        res.status(200).json({ message: '登录成功', user });
    } catch (error) {
        res.status(401).json({ message: '登录失败', error: error.message });
    }
});


module.exports = app;