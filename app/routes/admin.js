var admin_services = require('../services/admin');

//Get Admin
export default function routes(router) {
    router.get('/admin/', admin_services.getStore_Data);
    router.get('/admin/create', admin_services.create_form);
}
