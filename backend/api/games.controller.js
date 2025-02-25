//Zubaidah Bandele
//Feb 24, 2025
//zb64@njit.edu
//Phase 2
//IT302-452


import GamesDAO from '../dao/gamesDAO.js';

export default class GamesController {
    static async apiGetGames(req, res, next) {
        const gamesPerPage = req.query.gamesPerPage ? parseInt(req.query.gamesPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;

        let filters = {};

        if (req.query.genre) {
            filters.genre = req.query.genre;
        }

        if (req.query.title) {
            filters.title = req.query.title;
        }

        const { gamesList, totalNumGames } = await GamesDAO.getGames({
            filters, page, gamesPerPage
        });

        let response = {
            games: gamesList,
            page: page,
            filters: filters,
            entries_per_page: gamesPerPage,
            total_results: totalNumGames,
        };

        res.json(response);
    }
}
