import { createRouteInController } from '@controllers/RouteInController'

class IndexController {
    index = createRouteInController((req, res) => {
        res.send('Welcome!')
    })

    health = createRouteInController((req, res) => {
        res.send('OK')
    })
}

export default new IndexController()
