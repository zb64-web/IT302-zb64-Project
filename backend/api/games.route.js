import express from 'express'
import GamesController from './games.controller.js'
import CommentsController from './comments.controller.js'

const router = express.Router();

router.route('/').get(GamesController.apiGetGames)
router.route("/id/:id").get(GamesController.apiGetGamesById)
router.route("/comment").post(CommentsController.apiPostComment)
router.route("/comment").put(CommentsController.apiUpdateComment)
router.route("/comment").delete(CommentsController.apiDeleteComment)



export default router;
