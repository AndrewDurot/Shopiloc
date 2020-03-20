import './common/env';
import Server from './common/server';
import index from './routes/index';
import users from './routes/users';

export default new Server()
    .router(index)
    .router(users)
    .listen(process.env.PORT);
