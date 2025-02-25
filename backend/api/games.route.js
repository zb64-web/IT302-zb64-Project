import express from 'express'
import GamesController from './games.controller.js'

const router = express.Router();

router.route('/').get(GamesController.apiGetGames)
router.route("/id/:id").get(GamesController.apiGetGamesById)
router.get('/games', GamesController.apiGetGames);



export default router;
