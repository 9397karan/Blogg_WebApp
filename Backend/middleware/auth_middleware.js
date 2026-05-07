import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()

const authenticate = async (req, res, next) => {

    try {

        const token = req.cookies.refreshToken

        if (!token) {
            return res.status(401).json({
                message: "Token expired"
            })
        }

        const user = jwt.verify(token, process.env.JWT_SECRET)

        console.log(user)

  
        const accessToken = jwt.sign(
            {
                id: user.id,
                email: user.email,
                name: user.name
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '5m'
            }
        )

        // send access token
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 5 * 60 * 1000
        })

        req.user = user

        next()

    } catch (error) {

        return res.status(500).json({
            message: "Authentication failed",
            error: error.message
        })
    }
}

export default authenticate