var user_services = require('../services/user');
/* GET users listing. */
export default function routes(router) {
    router.get('/', function (req, res, next) {
        res.send('respond with a resource');
    });
    router.get('/signin', user_services.get_sign_in);
//SignIn Route
    router.post('/signin', user_services.sign_in);
//Register Route
    router.post('/register', user_services.register);
    router.get('/logout', async (req, res, next) => {
        res.clearCookie('auth');
        res.redirect('/users/signin');
    });
}
