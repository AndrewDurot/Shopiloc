var search_services = require('../services/search');

export default function routes(router) {
    router.get('/', search_services.get_store);
}