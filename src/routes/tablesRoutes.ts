import { TablesController } from '@/controllers/tablesController.js'
import { Router } from 'express'

const route = Router()
const tablesController = new TablesController()

route.get('/', tablesController.index)
route.get('/:id', tablesController.show)
route.post('/', tablesController.store)
route.put('/:id', tablesController.update)
route.delete('/:id', tablesController.delete)

export default route
