import { Request, Response, NextFunction, RequestHandler } from 'express'
import { z } from 'zod'

import { dbKnex } from '@/database/knex.js'
import AppError from '@/utils/AppError.js'

export default class ProductsController {
  index: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name } = req.query

      if (name) {
        const product = await dbKnex('products').whereLike(
          'name',
          `%${name ?? ''}%`
        )
        res.json(product)
        return
      }
      const products = await dbKnex('products').select().orderBy('name')

      res.json(products)
    } catch (error) {
      next(error)
    }
  }

  store: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const schema = z.object({
        name: z.string(),
        price: z.number(),
      })
      const { name, price } = schema.parse(req.body)

      await dbKnex('products').insert({ name, price })

      res.status(201).json()
    } catch (error) {
      next(error)
    }
  }

  update: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = z.coerce
        .number({
          invalid_type_error: 'id must be a number',
        })
        .parse(req.params.id)

      const schema = z.object({
        name: z.string(),
        price: z.number(),
      })
      const { name, price } = schema.parse(req.body)

      const result = await dbKnex('products').where({ id }).update({
        name,
        price,
        updated_at: dbKnex.fn.now(),
      })

      if (!result) {
        throw new AppError('Product not found')
      }

      const product = await dbKnex('products').where({ id }).select().first()

      res.json(product)
    } catch (error) {
      next(error)
    }
  }

  remove: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = z.coerce
        .number({
          invalid_type_error: 'id must be a number',
        })
        .parse(req.params.id)

      const product = await dbKnex('products').where({ id }).select().first() // use .first() | para retornar apenas um elemento e não uma lista

      if (!product) {
        throw new AppError('Product not found')
      }

      await dbKnex('products').where({ id }).del()

      res.json()
    } catch (error) {
      next(error)
    }
  }
}
