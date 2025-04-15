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
            filters.genre = req.query.genre
        } else if (req.query.title) {
            filters.title = req.query.title
        }
        const { gamesList, totalNumGames } = await GamesDAO.getGames({
            filters, page, gamesPerPage
        })

        let response = {
            games: gamesList,
            page: page,
            filters: filters,
            entries_per_page: gamesPerPage,
            total_results: totalNumGames,
        };
        res.json(response);
    }

    static async apiGetGamesById(req, res, next) {
        try {
            let id = req.params.id || {}
            let games = await GamesDAO.getGamesById(id)
            if (!games) {
                res.status(404).json({ error: "not found" })
                return
            }
            res.json(games)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetGenres(req, res, next) {
        try {
            let propertyTypes = await GamesDAO.getGenres()
            res.json(propertyTypes)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }
}

