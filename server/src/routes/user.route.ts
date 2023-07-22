import { Router } from 'express'
const router = Router()
import * as useController from '../controllers/User.controller'
router.get('/getUser', useController.getUser)

router.post('/newUser',useController.newUser)
// router.put(
//     '/updateLocation',
//     locationMiddleware.checkUpdatingLocation,
//     locationController.updateLocation,
// )

// router.put('/controlWaterPumping', locationController.controlWaterPumping)
// router.put('/controlLight', locationController.controlLight)

// router.delete('/deleteLocation', locationController.deleteLocation)
export default router
