import { Router } from 'express'
import { TablesSessionsController } from '@/controllers/tablesSessionsController.js'

const route = Router()
const tablesSessionsController = new TablesSessionsController()

route.get('/', tablesSessionsController.index)
route.post('/', tablesSessionsController.store)
route.patch('/:id', tablesSessionsController.update)

export default route
