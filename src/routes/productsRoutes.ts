import { Router } from 'express'
import ProductsController from '@/controllers/productsController.js'

const route = Router()

const productsController = new ProductsController()

route.get('/', productsController.index)
route.post('/', productsController.store)
route.put('/:id', productsController.update)
route.delete('/:id', productsController.remove)
export default route
