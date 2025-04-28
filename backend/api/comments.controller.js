//Zub//Zubaidah Bandele
//March 24, 2025
//zb64@njit.edu
//Phase 3
//IT302-452
import CommentsDAO from '../dao/commentsDAO.js'

export default class CommentsController {
    static async apiPostComment(req, res, next) {
        try {
            console.log("Request body:", req.body)
            const gameId = (req.body.games_id)
            const comment = req.body.comment
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const lastModified = new Date()

            console.log("Parsed data:", { gameId, comment, userInfo, lastModified }) 

            const CommentResponse = await CommentsDAO.addComment(
                gameId,
                userInfo,
                comment,
                lastModified
            )
            res.json(CommentResponse)
        } catch (e) {
            console.error("Error in apiPostComment:", e)
            res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateComment(req, res, next) {
        try {
            const commentId = req.body.comment_id;
            const comment = req.body.comment;
            const lastModified = new Date();
    
            const CommentResponse = await CommentsDAO.updateComment(
                commentId,
                req.body.user_id,
                comment,
                lastModified
            );
    
            var { error } = CommentResponse;
            if (error) {
                res.status(400).json({ error });
            }
            if (CommentResponse.modifiedCount === 0) {
                throw new Error("Unable to update comment. User may not be original poster");
            }
            res.json(CommentResponse);
        } catch (e) {
            console.error("Error in apiUpdateComment:", e);
            res.status(500).json({ error: e.message });
        }
    }

    static async apiDeleteComment(req, res, next) {
        try {
            const commentId = req.body.comment_id
            const userId = req.body.user_id
            const CommentResponse = await CommentsDAO.deleteComment(
                commentId,
                userId,
            )
            res.json(CommentResponse)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }


}
