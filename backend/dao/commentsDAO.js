import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let comments
export default class CommentsDAO {
    static async injectDB(conn) {
        if (comments) {
            return
        } try {
            comments = await conn.db(process.env.GAMES_NS).collection('comments')
        } catch (e) {
            console.error(`Unable to establish connection handle in commentDAO: ${e}`)
        }
    }
    static async addComment(gameID, user, comment, lastModified) {
        try {
            const commentDoc = {
                name: user.name,
                user_id: user._id,
                date: lastModified,
                comment: comment,
                games_id: new ObjectId(gameID)
            }
            return await comments.insertOne(commentDoc)
        } catch (e) {
            console.error(`Unable to post comment: ${e}`)
            console.error(e)
            return { error: e }
        }
    }

    static async updateComment(commentId, userId, comment, lastModified) {
        try {
            const updateResponse = await comments.updateOne(
                { user_id: userId, _id: new ObjectId(commentId) },
                { $set: { comment: comment, date: lastModified } }
            )
            return updateResponse
        } catch (e) {
            console.error(`Unable to update comment: ${e}`)
            console.error(e)
            return { error: e }
        }
    }

    static async deleteComment(commentId, userId) {
        try {
            const deleteResponse = await comments.deleteOne({
                _id: new ObjectId(commentId),
                user_id: userId,
            })
            return deleteResponse
        } catch (e) {
            console.error(`Unable to delete comment: ${e}`)
            console.error(e)
            return { error: e.message }
        }
    }


}
