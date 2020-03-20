const adminServices = require('../services/admin');

export default function routes(app) {
    app.get('/admin/', adminServices.getStore_Data);
    app.get('/admin/create', adminServices.create_form);
}
