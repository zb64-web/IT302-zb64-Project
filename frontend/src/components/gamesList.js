//Zubaidah Bandele
//IT302-452
//April 14, 2025
//Phase4
import React, { useState, useEffect } from 'react'
import GameDataService from "../services/gamesDataService"
import { Link } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const GamesList = () => {
    const [games, setGames] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchGenre, setSearchGenre] = useState("");
    const [genres, setGenres] = useState(["All Genres"]);

    useEffect(() => {
        retrieveGames();
        retrieveGenres();
    }, []);

    const retrieveGames = () => {
        GameDataService.getAll()
            .then((response) => {
                console.log(response.data);
                setGames(response.data.games);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const retrieveGenres = () => {
        GameDataService.getGenres()
      .then((response) => {
        console.log(response.data);
        setGenres(["All Genres"].concat(response.data));
      })
      .catch(e => {
        console.log(e);
      });
    };


    const onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value
        setSearchTitle(searchTitle);
    };

    const onChangeSearchGenre = (e) => {
        const searchGenre = e.target.value;
        setSearchGenre(searchGenre);
    };

    const find = (query, by) => {
        GameDataService.find(query, by)
            .then(response => {
                console.log(response.data)
                setGames(response.data.games)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const findByTitle =
        () => {
            setSearchGenre("")
            find(searchTitle, "title")
        }

    const findByGenre =
        () => {
            setSearchTitle("")
            if (searchGenre === "All Genres") {
                retrieveGames()
            } else {
                find(searchGenre, "genre")
            }
        }

    return (
        <div className="App">
            <Container>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Search by title"
                                    value={searchTitle}
                                    onChange={onChangeSearchTitle}
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={findByTitle}
                            >
                                Search
                            </Button>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    as="select" onChange={onChangeSearchGenre} >
                                    {genres.map(genre => {
                                        return (
                                            <option value={genre} selected={genre === searchGenre} >{genre}</option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={findByGenre}
                            >
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    {games.map((game) => {
                        return (
                            <Col key={game._id}> {/* Add a unique key here */}
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img src={game.thumbnail + "/100px180"} />
                                    <Card.Body>
                                        <Card.Title>{game.title}</Card.Title>
                                        <Card.Text>
                                            Genre: {game.genre}
                                        </Card.Text>
                                        <Card.Text>{game.short_description}</Card.Text>
                                        <Link to={"/games/" + game._id} >View Game</Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
}

export default GamesList;