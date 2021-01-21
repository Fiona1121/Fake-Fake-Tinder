import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import "./Card.css";
import client from "../../client";
import { Link } from "react-router-dom";

const alreadyRemoved = new Set();
var isLogin = false;

const Card = ({ userID }) => {
    const [people, setPeople] = useState([]);
    const [likedBy, setLikedBy] = useState([]);
    const [like, setLike] = useState([]);
    const [user, setUser] = useState({ id: userID });

    const sendData = (data) => {
        client.send(JSON.stringify(data));
    };
    client.onopen = () => sendData(["getCards", { userID: user.id }]);
    client.onmessage = (message) => {
        const { data } = message;
        const [task, payload] = JSON.parse(data);

        switch (task) {
            case "setCardUser": {
                console.log("set user", payload[0].id);
                isLogin = true;
                setUser({ id: payload[0].id });
                setLike(payload[0].like);
                setLikedBy(payload[0].likedBy);
                sendData(["getCards", { userID: payload[0].id }]);
                sendData(["initHeader", { userID: payload[0].id }]);
                break;
            }
            case "initCard": {
                setPeople(() => payload);
                console.log("Card accept init card")
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

    const outOfFrame = (id) => {
        console.log(id + " left the screen!");
    };

    const swiped = (direction, idToDelete) => {
        console.log("removing: " + idToDelete);
        alreadyRemoved.add(idToDelete);
        console.log(alreadyRemoved);
        if (direction === "left") {
            addDislike(idToDelete);
        }
        if (direction === "right") {
            //if (likedBy.includes(idToDelete)) console.log("match!");
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
        sendData(["like", { userID: user.id, id: id }]);
    };

    const addDislike = (id) => {
        //swipe("left");
        sendData(["dislike", { userID: user.id, id: id }]);
    };

    /*
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
    */

    return (
        <div>
            {isLogin ? (
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
                        <div className="info">
                            <h3>no other user left...</h3>
                        </div>
                    )}
                </div>
            ) : (
                <div className="card-box">
                    <h3>PLEASE LOGIN!!</h3>
                    <br></br>
                    <Link to="/loginpage">
                        <button className="btn-one" type="submit">
                            Login
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Card;
