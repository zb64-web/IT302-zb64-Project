import React, { useState, useEffect } from 'react'
import GameDataService from '../services/gamesDataService'
import { Link, useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Game = ({ user }) => {

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
                setGame(response.data)
                console.log("Game data from backend:", response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }
    useEffect(() => {
        getGame(id)
    }, [id])

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Image src={game.thumbnail + "/100px250"} fluid />
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">{game.title}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {game.short_description}
                                </Card.Text>
                                {user &&
                                    <Link to={"/games/" + id + "/comment"}>
                                        Add Comment
                                    </Link>}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Game;