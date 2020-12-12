const jwt = require('jsonwebtoken');

exports.includeAccessToken = (user) => {
    const payload = {id: user.id, password: user.password};
    let userObject = user.toJSON();
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    userObject['token'] = token;

    return userObject;
};


