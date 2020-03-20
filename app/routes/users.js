const userServices = require('../services/user');

export default function routes(router) {
    router.get('/', function (req, res, next) {
        res.send('respond with a resource');
    });
    router.get('/signin', userServices.get_sign_in);
    router.post('/signin', userServices.sign_in);
    router.post('/register', userServices.register);
    router.get('/logout', async (req, res, next) => {
        res.clearCookie('auth');
        res.redirect('/users/signin');
    });
}
