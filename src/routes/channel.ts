import { Router } from "express";
import ChannelService from "../services/channel.service";
import passport from "passport";

const service = new ChannelService()
const router = Router()

router.get('/', passport.authenticate("jwt", { session: true }), async (req, res, next) => {
  try{
    const channels = await service.find()
    res.json(channels)
  }catch(error){
    next(error)
  }
})
router.post('/', passport.authenticate("jwt", { session: true }), async (req, res, next) => {
  try{
    const body = req.body
    const channel = await service.create(body)
    res.json(channel)
  }catch(error){
    next(error)
  }
})
export default router
