//Zubaidah Bandele
//IT302-452
//April 14, 2025
//Phase4
import React, { useState, useEffect } from 'react'
import GameDataService from '../services/gamesDataService'
import { Link, useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const Game = (props) => {

    const [game, setGame] = useState({
        id: null,
        title: "",
        genre: "",
        thumbnail: "",
        short_description: "",
        comments: []
    })
    let { id } = useParams();

    const getGame = id => {
        GameDataService.get(id)
            .then(response => {
                console.log("Game data from backend:", response.data);
                setGame(response.data)
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(() => {
        getGame(id)
    }, [id])

    const deleteComment = (commentId, index) => {
        GameDataService.deleteComment(commentId, props.user.id)
            .then(response => {
                setGame((prevState) => {
                    prevState.comments.splice(index, 1)
                    return ({
                        ...prevState
                    })
                })
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                    <Image src={game.thumbnail || null} fluid />
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">{game.title}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {game.short_description}
                                </Card.Text>
                                {props.user &&
                                    <Link to={"/" + id + "/comment"}>
                                        Add Comment
                                    </Link>}
                            </Card.Body>
                        </Card>
                        <br></br>
                        <h2>Comments</h2><br></br>
                        {game.comments?.map((comment, index) => {
                            console.log("Rendering comment:", comment);
                            return (
                                <Card key={index}>
                                    <Card.Body>
                                        <h5>{comment.name + " commented on " + new Date(Date.parse(comment.date)).toDateString()}</h5>
                                        <p>{comment.comment}</p>
                                        {props.user && props.user.id === comment.user_id &&
                                            <Row>
                                                <Col><Link
                                                    to={"/" + id + "/comment"}
                                                    state={{ currentComment: comment }}
                                                >Edit</Link>
                                                </Col>
                                                <Col><Button variant="link" onClick={() => deleteComment(comment._id, index)}>Delete</Button></Col>
                                            </Row>}
                                    </Card.Body>
                                </Card>
                            )
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}


export default Game;