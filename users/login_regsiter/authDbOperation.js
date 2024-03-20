// dbOperations.js

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
const db = mongoose.connection;

const User = mongoose.model('User', {
    userid: { type: String, unique: true }, // userid唯一
    username: String,
    password: String,
    email: String,
    nickname: String,
    usericon: String,
    bio: { type: String, default: '' }
});

// 用户注册函数
async function registerUser(userid, username, password, email, nickname) {
    try {
        const newUser = new User({ userid, username, password, email, nickname });
        await newUser.save();
        return newUser;
    } catch (error) {
        throw new Error(error.message);
    }
}

// 用户登录函数
async function loginUser(username, password) {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('用户名不存在');
        }
        if (user.password !== password) {
            throw new Error('密码错误');
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { registerUser, loginUser };
