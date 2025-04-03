import express from 'express'
import Group from 'express-route-groups'
import ItemsManagementController from './controller/items-management.controller';
import RateLimiterMiddleware from '../common/middlewares/rate-limiter-middleware';
import TokenMiddleware from '../common/middlewares/token-middleware';

const v1 = express()
v1.use(express.json())

const rateLimiter = new RateLimiterMiddleware().getmiddleware
const tokenMiddleware = new TokenMiddleware()
const verifyTokenMiddleware = new TokenMiddleware().verifyAppTokenMiddleware
const itemsManagementController = new ItemsManagementController()

v1.post('/login',(req,res)=>{ tokenMiddleware.createToken(req,res)} )

v1.use(Group('/items',[verifyTokenMiddleware,rateLimiter], (router: express.Router) => {
    router.get('/list',(req,res)=>{ itemsManagementController.fetch(req,res) })
}));



export default v1