import jwt from 'jsonwebtoken';

// Middleware для проверки если в запросе есть токен или нет
export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');  //изначально здесь такая строка Bearer hjhjh32h323lkj нам нужно вырезать именно токен с помощью реплейс
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'hjkshdcjh43jkkhk9sdsufj7');
            req.userId = decoded.id;
            next();
        } catch (error) {
            return res.json({
                message: "no access"
            })
        }
    } else {
        return res.json({
            message: "no access"
        })
    }
}