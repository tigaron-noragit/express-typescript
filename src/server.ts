import App from '@/app';
import UserRoute from '@routes/users.route';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new UserRoute()]);

app.listen();
