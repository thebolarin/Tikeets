/* eslint-disable consistent-return */
const { NotAuthorizedError } = require('@bolarin/common');


const authorizeAdmin = (req, res, next) => {
    const { role } = req.currentUser;
    if (role !== 'admin') {
        throw new NotAuthorizedError();
    }
    return next()
}

module.exports = { authorizeAdmin }