import { dbKnex } from '@/database/knex.js'
import AppError from '@/utils/AppError.js'
import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

class OrdersController {
  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_session_id: z.number(),
        product_id: z.number(),
        quantity: z.number(), // preço não precisa pois irei pegar do produto com um join
      })

      const { table_session_id, product_id, quantity } = bodySchema.parse(
        req.body
      )

      // pra criar um pedido, preciso fazer algumas validações..
      // - Aquela sessão existe e não está fechada

      const session = await dbKnex('tables_sessions')
        .where({
          id: table_session_id,
        })
        .first()

      // .first() pois quero o item (obj), sem esse metodo tenho como retorna uma lista com um item

      // sessão existe?
      if (!session) {
        throw new AppError('This session not found.')
      }

      // caso ela exista.. preciso garantir que está aberta.
      if (session.closed_at) {
        throw new AppError('This session is already closed.')
      }

      // - Produto existe < verificação do produto

      const product = await dbKnex('products')
        .where({
          id: product_id,
        })
        .first()

      if (!product) {
        throw new AppError('This product is not found.')
      }

      // passou por todos os filtros, ai sim crio o produto:

      await dbKnex('orders').insert({
        table_session_id,
        product_id,
        quantity,
        price: product.price,
      })
      res.status(201).json()
    } catch (error) {
      next(error)
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const table_session_id = z.coerce
        .number({
          invalid_type_error: 'id must be a number',
        })
        .parse(req.params.table_session_id)

      const session = await dbKnex('tables_sessions')
        .where({
          id: table_session_id,
        })
        .first()

      if (!session) {
        throw new AppError('This session is not found.')
      }

      const orders = await dbKnex('orders')
        .where({
          table_session_id,
        })
        .select(
          'orders.id',
          'orders.table_session_id',
          'orders.product_id',
          'products.name',
          'orders.quantity',
          'orders.price'
        )
        .join('products', 'orders.product_id', 'products.id')

      res.json(orders)
    } catch (error) {
      next(error)
    }
  }

  async showTotal(req: Request, res: Response, next: NextFunction) {
    try {
      const table_session_id = z.coerce
        .number({
          invalid_type_error: 'id must be a number',
        })
        .parse(req.params.table_session_id)

      const session = await dbKnex('orders')
        .select(
          dbKnex.raw('SUM (quantity * price) AS Total, SUM (quantity) AS Items')
        )
        .where({
          table_session_id,
        })

      if (!session) {
        throw new AppError('This session has no orders.')
      }

      res.json(session)
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = z.coerce
        .number({
          invalid_type_error: 'id must be a number',
        })
        .parse(req.params.id)

      const result = await dbKnex('orders').del().where({
        id,
      })

      if (!result) {
        throw new AppError('Order is not found.')
      }

      res.json()
    } catch (error) {
      next(error)
    }
  }
}

export { OrdersController }
