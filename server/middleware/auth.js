import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        isCustomJwtToken = token.length < 500;
        let decodedData;
        if() {
            decodedData = jwt.verify(toke, 'key_should_be_inside_env_file'); // the same key in signup and signin
        } else {

        }
    } catch(err) {

    }

}