import { Router } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import UserRouter from '../user/user.routes';
import DashboardRouter from '../dashboard/dashboard.routes';
import ProductsRouter from '../products/products.routes';
import Redis from '../util/redis';

const mainRouter: Router = Router();
mainRouter.route('/').get(async (req, res) => {
  console.log(await Redis.get('user'));

  res.json({ msg: 'hii and welcome' });
});
mainRouter.get('/user', async (req, res) => {
  await Redis.setEx('user', 3600, 'user hehe');

  // @ts-ignore
  res.send({ currentUser: req['currentUser'] || null });
});
mainRouter.use(UserRouter);
mainRouter.use(ProductsRouter);
mainRouter.use(DashboardRouter);

export default mainRouter;
