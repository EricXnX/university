// homePageDbOperations.js

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/social_media/users', {
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

// 获取个人主页信息函数
async function getUserProfile(userid) {
    try {
        const userProfile = await User.findOne({ userid });
        if (!userProfile) {
            throw new Error('用户不存在');
        }
        return userProfile;
    } catch (error) {
        throw new Error(error.message);
    }
}

// 更新个人主页信息函数
async function updateUserProfile(userid, nickname, bio) {
    try {
        const updatedUser = await User.findOneAndUpdate({ userid }, { nickname, bio }, { new: true });
        if (!updatedUser) {
            throw new Error('用户不存在');
        }
        return updatedUser;
    } catch (error) {
        throw new Error(error.message);
    }
}

// 上传用户头像函数
async function uploadUserIcon(username, usericon) {
    try {
        const updatedUser = await User.findOneAndUpdate({ username }, { usericon }, { new: true });
        if (!updatedUser) {
            throw new Error('用户不存在');
        }
        return updatedUser;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { getUserProfile, updateUserProfile, uploadUserIcon };
