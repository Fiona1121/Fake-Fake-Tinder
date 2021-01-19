import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import "./Card.css";
import client from "./client";

const alreadyRemoved = new Set();

const Card = () => {
    const [people, setPeople] = useState([]);
    const [likedBy, setLikedBy] = useState([]);
    const [like, setLike] = useState([]);
    const [opened, setOpened] = useState(false);
    const [lastDirection, setLastDirection] = useState();

    client.onmessage = (message) => {
        const { data } = message;
        const [task, payload] = JSON.parse(data);

        switch (task) {
            case "initCard": {
                setPeople(() => payload);
                break;
            }
            case "updateCard": {
                setPeople(() => [...people, ...payload]);
                break;
            }
            case "likeList": {
                setLike(() => payload);
                break;
            }
            case "likedByList": {
                setLikedBy(() => payload);
                break;
            }
            default:
                break;
        }
    };

    const sendData = (data) => {
        client.send(JSON.stringify(data));
    };

    const outOfFrame = (id) => {
        console.log(id + " left the screen!");
    };

    const swiped = (direction, idToDelete) => {
        console.log("removing: " + idToDelete);
        setLastDirection(direction);
        alreadyRemoved.add(idToDelete);
        console.log(alreadyRemoved);
        if (direction === "left") {
            addDislike(idToDelete);
        }
        if (direction === "right") {
            addLike(idToDelete);
        }
    };

    const swipe = (dir) => {
        const cardsLeft = people.filter((person) => !alreadyRemoved.has(person.name));
        if (cardsLeft.length) {
            const toBeRemoved = cardsLeft[cardsLeft.length - 1].id; // Find the card object to be removed
            const index = people.map((person) => person.id).indexOf(toBeRemoved); // Find the index of which to make the reference to
            alreadyRemoved.add(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
        }
    };

    const addLike = (id) => {
        //swipe("right");
        sendData(["like", { id: id }]);
    };

    const addDislike = (id) => {
        //swipe("left");
        sendData(["dislike", { id: id }]);
    };

    const SwipeButtons = () => {
        return (
            <div className="swipeButtons">
                <IconButton className="swipeButtons__left" onClick={swipe("left")}>
                    <CloseIcon fontSize="large" />
                </IconButton>
                <IconButton className="swipeButtons__right" onClick={swipe("right")}>
                    <FavoriteIcon fontSize="large" />
                </IconButton>
            </div>
        );
    };
    useEffect(() => {
        client.onopen = () => {
            sendData(["getCards", { msg: "get" }]);
        };
    }, [opened]);

    return (
        <div>
            <div className="cardContainer">
                {people ? (
                    people.map((person) =>
                        alreadyRemoved.has(person.id) ? null : (
                            <TinderCard
                                className="swipe"
                                key={person.id}
                                onSwipe={(dir) => swiped(dir, person.id)}
                                preventSwipe={["up", "down"]}
                                onCardLeftScreen={() => outOfFrame(person.id)}
                            >
                                <div
                                    style={{
                                        backgroundImage: person.photo
                                            ? `url(${person.photo})`
                                            : `url(https://i.pinimg.com/originals/7a/98/1d/7a981de80cfa0a7aa92f5d523d3509cc.jpg)`,
                                    }}
                                    className="card"
                                >
                                    <h3>{person.name}</h3>
                                </div>
                            </TinderCard>
                        )
                    )
                ) : (
                    <h3>no other user left...</h3>
                )}
            </div>
            <div className="swipeButtonContainer">
                <SwipeButtons />
            </div>
        </div>
    );
};

export default Card;
