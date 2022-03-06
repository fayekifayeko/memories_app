import jwt from 'jsonwebtoken'

export const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const isCustomJwtToken = token.length < 500
        let decodedData
        if (isCustomJwtToken && token) {
            decodedData = jwt.verify(token, 'key_should_be_inside_env_file') // the same key in signup and signin
            req.userId = decodedData?.id
        } else {
            // Google Token
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub
        }

        next()
    } catch (err) {
        console.log(err)
    }
}
