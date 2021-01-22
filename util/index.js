const fun = {};
const sequelize = require("../config/dbConfig"); //connect db  query string
const messages = require('../messages/index');
const jwt_decode = require("jwt-decode");

fun.sequelizeString = async (sql, bind) => {
    const res = await sequelize.query(sql, { bind: bind });
    return res[0].length > 0 ? res[0] : [];
}

/* เข้ารหัส Password */
fun.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(5);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
};

/* ตรวจสอบ Password */
fun.checkPassword = async (password, passwordDB) => {
    const isValid = await bcrypt.compare(password, passwordDB);
    return isValid;
};

fun.decodeToken = async (auth) => {
    const authHeader = auth;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        const error = new Error(messages.errorUserNot);
        error.statusCode = 402;
        throw error;
    }
    return jwt_decode(token);
};


module.exports.fun = fun;
