let games

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

    static async apiGamesById(id) {
        try {
            return await games.aggregate([
                {
                    $match: {
                        _id: ObjectId.createFromHexString(id),
                    }
                },
                {
                    $lookup:
                    {
                        from: 'games_zb64',
                        localField: '_id',
                        foreignField: 'id',
                        as: 'games'
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