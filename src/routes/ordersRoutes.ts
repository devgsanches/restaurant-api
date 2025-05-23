import { Router } from 'express'
import { OrdersController } from '@/controllers/ordersController.js'

const route = Router()
const ordersController = new OrdersController()

route.get('/table-session/:table_session_id', ordersController.show)
route.get('/table-session/:table_session_id/total', ordersController.showTotal)
route.post('/', ordersController.store)
route.delete('/:id', ordersController.delete)

export default route
