import { Router } from 'express'
import productsRoutes from '@/routes/productsRoutes.js'
import tablesRoutes from '@/routes/tablesRoutes.js'
import tablesSessionsRoutes from '@/routes/tablesSessions.js'
import ordersRoutes from '@/routes/ordersRoutes.js'

const routes = Router()

routes.use('/products', productsRoutes)
routes.use('/tables', tablesRoutes)
routes.use('/tables-sessions', tablesSessionsRoutes)
routes.use('/orders', ordersRoutes)

export default routes
