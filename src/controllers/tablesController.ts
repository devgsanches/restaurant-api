import { dbKnex } from '@/database/knex.js'
import type { Request, Response, NextFunction } from 'express'

class TablesController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const tables = await dbKnex('tables').select()

      res.json(tables)
    } catch (error) {
      next(error)
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const table = await dbKnex('tables').select().where({ id })

      res.json(table)
    } catch (error) {
      next(error)
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const { table_number } = req.body

      await dbKnex('tables').insert({ table_number })

      res.status(201).json()
    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const { table_number } = req.body

      const table = await dbKnex('tables').update({ table_number }).where({
        id,
      })

      res.json(table)
    } catch (error) {
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params

      const result = await dbKnex('tables').delete().where({
        id,
      })

      if (!result) {
        res.json({
          message: 'Table is not found.',
        })
      }

      res.json()
    } catch (error) {
      next(error)
    }
  }
}

export { TablesController }
