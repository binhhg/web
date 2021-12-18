module.exports = (joi, mongoose, {joi2MongoSchema, serverHelper}) => {
    const {ObjectId} = mongoose.Types
    const articleJoi = joi.object({
        title:joi.string().required(),
        content: joi.string().required(),
        categories: joi.array().items(joi.string()),
        like: joi.number().default(0),
        dislike: joi.number().default(0),
        slug: joi.string().allow(''),
        tags: joi.array().items(joi.string())
    })
    const articleSchema = joi2MongoSchema(articleJoi, {
        username: {
            type: String,
            unique: true,
            lowercase: true,
            index: true
        },
        categories: [
            {
                type: ObjectId,
                ref: 'Category'
            }
        ],
        tags: [
            {
                type: ObjectId,
                ref: 'Tag'
            }
        ]
    },{
        createdBy: {
          type: ObjectId,
          ref: 'User'
        },
        createdAt: {
            type: Number,
            default: () => Math.floor(Date.now() / 1000)
        }
    })
    articleSchema.statics.validateObj = async (obj, config = {}) => {
        const {
            error,
            value
        } = await articleJoi.validate(obj, config)
        if (!error) {
            value.slug = serverHelper.stringToSlug(value.title)
        }
        return { error, value }
    }
    const documentModel = mongoose.model('Article', articleSchema)
    documentModel.syncIndexes()
    return documentModel

}

