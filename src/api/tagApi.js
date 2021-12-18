module.exports = (app, container) => {
    const { serverSettings } = container.resolve('config')
    const { tagController } = container.resolve('controller')
    const { verifyAccessToken } = container.resolve('middleware')
    const { basePath } = serverSettings
    app.get("/tag", verifyAccessToken, tagController.getTag)
    app.get("/tag/list", verifyAccessToken, tagController.tagList)
    app.get("/tag/:id", verifyAccessToken, tagController.getTagById)
    app.put("/tag/:id", verifyAccessToken, tagController.updateTag)
    app.delete("/tag/:id", verifyAccessToken, tagController.deleteTag)
    app.post("/tag", verifyAccessToken, tagController.addTag)
}
