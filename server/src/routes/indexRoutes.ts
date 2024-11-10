import IndexController from '@controllers/IndexController'
import { createConfig, createRouter } from '@controllers/RouteInController'

export default createRouter([
    createConfig('get', '/', IndexController.index),
    createConfig('get', '/health', IndexController.health),
])
