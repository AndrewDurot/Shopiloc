import * as express from "express";
const storeServices = require('../services/store');
const multer = require('multer');
const path = require('path');

export default function routes(router) {
    router.use(express.static(__dirname));
    const storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './uploads')
        },
        filename: function (req, file, callback) {
            console.log(file);
            callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    });
    const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    };
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 5
        },
        fileFilter: fileFilter
    });

    router.post('/', upload.single('store_logo'), storeServices.create_store);
    router.get('/', storeServices.get_store);
    router.get('/Details', storeServices.get_single_store);
    //  router.put('/', storeServices.create_store);
    router.post('/update', storeServices.patch_store);
    //  router.delete('/', storeServices.create_store);
}
