let games

export default class GamesDAO {
    static async injectDB(conn) {
        if (games) {
            return
        } try {
            games = await conn.db(process.env.GAMES_NS).collection('games')
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
}