import express from 'express'
import routes from '@/routes/index.js'
import { errorHandling } from '@/middlewares/errorHandling.js'

const app = express()

const PORT = 3333

app.use(express.json())
app.use(routes)
app.use(errorHandling)

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}🚀`))
