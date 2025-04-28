//Zubaidah Bandele
//March 24, 2025
//zb64@njit.edu
//Phase 3
//IT302-452

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
                games_id: ObjectId.createFromHexString(gameID)
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
                { user_id: userId, _id: ObjectId.createFromHexString(commentId) },
                { $set: { comment: comment, date: lastModified } }
            )
            return updateResponse
        } catch (e) {
            console.error(`Unable to update comment: ${e}`)
            console.error(e)
            return { error: e }
        }
    }

    static async apiDeleteComment(req,res,next) {
        try {
          const commentId = req.body.comment_id
          const userId = req.body.user_id
          const CommentResponse = await CommentsDAO.deleteComment(
            commentId,
            userId,
          )
          res.json(CommentResponse)
        } catch(e) {
          res.status(500).json({ error: e.message})
        }
    }

    static async deleteComment(commentId, userId) {
        try {
            const deleteResponse = await comments.deleteOne({
                _id: Object.createFromHexString(commentId),
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