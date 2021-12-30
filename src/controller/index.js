module.exports = (container) => {
  const userController = require('./userController')(container)
  const categoryController = require('./categoryController')(container)
  const articleController = require('./articleController')(container)
  const commentController = require('./commentController')(container)
  const authorizationController = require('./authorizationController')(container)
  const tagController = require('./tagController')(container)
  const uploadController = require('./uploadController')(container)
  return {
    userController,
    categoryController,
    articleController,
    commentController,
    authorizationController,
    tagController,
    uploadController
  }
}
