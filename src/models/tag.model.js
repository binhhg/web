module.exports = (joi, mongoose, {joi2MongoSchema, serverHelper}) => {
    const {ObjectId} = mongoose.Types
    const tagJoi = joi.object({
        title:joi.string().required(),
        content: joi.string().required(),
        categorys: joi.array().items(joi.string()),
        like: joi.number().default(0),
        dislike: joi.number().default(0),
        slug: joi.string().allow('')
    })
    const tagSchema = joi2MongoSchema(tagJoi, {
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
    tagSchema.statics.validateObj = async (obj, config = {}) => {
        const {
            error,
            value
        } = await tagJoi.validate(obj, config)
        if (!error) {
            value.slug = serverHelper.stringToSlug(value.title)
        }
        return { error, value }
    }
    const documentModel = mongoose.model('Tag', tagSchema)
    documentModel.syncIndexes()
    return documentModel

}


