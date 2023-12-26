const validationMiddleware = (schema) => async (req, res, next) => {
    const data = req.body
    try {
        await schema.validate(data)
        next()
    } catch (error) {
        console.log(error)
        return res.status(422).json({error})
    }
} 

module.exports = validationMiddleware;