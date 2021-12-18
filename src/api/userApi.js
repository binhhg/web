module.exports = (app, container) => {
    const { userController } = container.resolve('controller')
    const { checkAccessToken } = container.resolve('middleware')
    app.get("/user", checkAccessToken, userController.getUser)
    app.get("/user/logout", userController.logout)
    app.post("/user/login", userController.login)
    app.get("/user/:id", checkAccessToken, userController.getUserById)

    app.put("/user/changePassword", userController.changePassword)
    app.put("/user/:id", checkAccessToken, userController.updateUser)
    app.delete("/user/:id", checkAccessToken, userController.deleteUser)
    app.post("/user", checkAccessToken, userController.addUser)
}
