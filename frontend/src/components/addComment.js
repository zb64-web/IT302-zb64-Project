//Zubaidah Bandele
//IT302-452
//April 23, 2025
//Phase5

import React, { useState } from 'react'
import GameDataService from "../services/gamesDataService"
import { Link, useParams, useLocation } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddComment = (props) => {
  let editing = false
  let initialCommentState = ""
  const location = useLocation();
  if (location.state && location.state.currentComment) {
    editing = true
    initialCommentState = location.state.currentComment.comment
  }

  const [comment, setComment] = useState(initialCommentState)
  const [submitted, setSubmitted] = useState(false)

  let { id } = useParams();

  const onChangeComment = e => {
    const comment = e.target.value
    setComment(comment);
  }

  const saveComment = () => {
    var data = {
      comment: comment,
      name: props.user.name,
      user_id: props.user.id,
      games_id: id
    }
    if (editing && location.state && location.state.currentComment) {
      data.comment_id = location.state.currentComment._id;
      GameDataService.updateComment(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        })
    } else {
      GameDataService.createComment(data)
        .then(response => {
          console.log("Comment created:", response.data);
          setSubmitted(true)
        }).catch(e => { })
    }
  }

  return (
    <div>
      {submitted ? (
        <div>
          <h5>Comment submitted successfully</h5>
          <Link to={"/games/"+ id }>Back to Game</Link>
        </div>
      ) : (
        <Form>
          <Form.Group>
            <Form.Label>{editing ? "Edit" : "Create"} Comment</Form.Label>
            <Form.Control
              type="text"
              required
              value={comment}
              onChange={onChangeComment}
            />
          </Form.Group>
          <Button variant="primary" onClick={saveComment}>
            Submit
          </Button>
        </Form>
      )}
    </div>
  )
}

export default AddComment;

