import DatabaseService from '@services/DatabaseService'
import { Application } from 'express'

const setupExpress = async ({ app: _ }: { app: Application }) => {
    await DatabaseService.setup()
}

export default setupExpress
