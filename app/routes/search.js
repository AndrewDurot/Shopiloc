const searchServices = require('../services/search');

export default function routes(app) {
    app.get('/', searchServices.get_store);
}