import express from 'express';
import GamesController from './games.controller.js';

const router = express.Router();

router.route('/').get(GamesController.apiGetGames);

export default router;
