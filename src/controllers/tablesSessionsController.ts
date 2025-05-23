import { dbKnex } from '@/database/knex.js'
import AppError from '@/utils/AppError.js'
import type { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

class TablesSessionsController {
  // list all tables
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const sessions = await dbKnex('tables_sessions').orderBy(
        'opened_at',
        'desc'
      )

      res.json(sessions)
    } catch (error) {
      next(error)
    }
  }

  // create a new session
  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const schema = z.object({
        table_id: z.number(),
      })

      const { table_id } = schema.parse(req.body)

      const session = await dbKnex('tables_sessions')
        .where({
          table_id,
        })
        .first()
        .orderBy('opened_at', 'desc')

      if (session && !session.closed_at) {
        throw new AppError('This table is already open.')
      }

      await dbKnex('tables_sessions').insert({ table_id })

      res.status(201).json()

      // abrir mesa OK
    } catch (error) {
      next(error)
    }
  }

  // close a exist session
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = z.coerce
        .number({
          invalid_type_error: 'id must be a number',
        })
        .parse(req.params.id)

      const session = await dbKnex('tables_sessions')
        .where({
          id,
        })
        .first()

      if (!session) {
        throw new AppError('Session Table not found.')
      }

      if (session.closed_at) {
        throw new AppError('This session table is already closed')
      }

      await dbKnex('tables_sessions')
        .update({
          closed_at: dbKnex.fn.now(),
        })
        .where({
          id,
        })

      res.json()
    } catch (error) {
      next(error)
    }
  }
}

export { TablesSessionsController }
