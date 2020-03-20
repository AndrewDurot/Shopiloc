import './common/env';
import Server from './common/server';
import admin from './routes/admin';
import index from './routes/index';
import search from './routes/search';
import store from './routes/store';
import users from './routes/users';

export default new Server()
    .router(index)
    .router(users)
    .listen(process.env.PORT);
