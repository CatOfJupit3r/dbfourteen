import { errorHandlerMiddleware } from '@middlewares/ErrorHandlerMiddleware'
import indexRoutes from '@routes/indexRoutes'
import cors from 'cors'
import express, { Application } from 'express'

const setupExpress = async ({ app }: { app: Application }) => {
    app.use(cors())
    app.use(express.json())

    app.use('/', indexRoutes)

    app.use(errorHandlerMiddleware)
}

export default setupExpress
