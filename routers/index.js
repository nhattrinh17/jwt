const authRouter = require("./auth")
const userRouter = require("./user")

function route(app) {
    // Router auth
    app.use('/auth', authRouter);

    // Router user
    app.use('/user', userRouter)

    // Không nên để bên trên do nếu để trên n sẽ ưu tiên và vào trước
    // app.use('/', siteRoute);
}

module.exports = route;
