module.exports = (app, container) => {
    const { categoryController } = container.resolve('controller')
    const { checkAccessToken } = container.resolve('middleware')
    app.get("/category", checkAccessToken, categoryController.getCategory)
    app.get("/category/article", checkAccessToken, categoryController.getArticle)
    app.get("/category/:id", checkAccessToken, categoryController.getCategoryById)
    app.put("/category/:id", checkAccessToken, categoryController.updateCategory)
    app.delete("/category/:id", checkAccessToken, categoryController.deleteCategory)
    app.post("/category", checkAccessToken, categoryController.addCategory)
}
