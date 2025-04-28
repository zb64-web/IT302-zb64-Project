let games
import { ObjectId } from 'mongodb';


export default class GamesDAO {
    static async injectDB(conn) {
        if (games) {
            return
        } try {
            games = await conn.db(process.env.GAMES_NS).collection('games_zb64')
        } catch (e) {
            console.error(`unable to connect in GamesDAO: ${e}`)
        }
    }

    static async getGames({
        filters = null,
        page = 0,
        gamesPerPage = 20,
    } = {}) {
        let query
        if (filters) {
            if ("title" in filters) {
                query = { $text: { $search: filters['title'] } }
            } else if ("genre" in filters) {
                query = { "genre": { $eq: filters['genre'] } }
            }
        }
        let cursor
        try {
            cursor = await games
                .find(query)
                .limit(gamesPerPage)
                .skip(gamesPerPage * page)
            const gamesList = await cursor.toArray()
            const totalNumGames = await games.countDocuments(query)
            return { gamesList, totalNumGames }
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            console.error(e)
            return { gamesList: [], totalNumGames: 0 }
        }
    }

    static async getGenres() {
        try {
            return await games.distinct("genre");
        } catch (e) {
            console.error(`Unable to get genres: ${e}`);
            return [];
        }
    }
    

    static async getGamesById(id) {
        try {
            return await games.aggregate([
                {
                    $match: {
                        _id: ObjectId.createFromHexString(id),
                    }
                },
                {
                    $lookup: {
                        from: 'comments',
                        localField: '_id',
                        foreignField: 'games_id',
                        as: 'comments'
                    }
                }
            ]).next()
        }
        catch (e) {
            console.error(`something went wrong in getMovieById: ${e}`)
            throw e
        }
    }
}