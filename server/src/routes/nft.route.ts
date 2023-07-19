import { Router } from 'express'
const router = Router()
import * as nftController from '../controllers/NFT.controller'
router.get('/getNFT', nftController.getNFT)

router.post('/createNFT',nftController.createNFT)

// router.put(
//     '/updateLocation',
//     locationMiddleware.checkUpdatingLocation,
//     locationController.updateLocation,
// )

// router.put('/controlWaterPumping', locationController.controlWaterPumping)
// router.put('/controlLight', locationController.controlLight)

// router.delete('/deleteLocation', locationController.deleteLocation)
export default router
