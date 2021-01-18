import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import "./Card.css";
import client from "./client";

const Card = () => {
    const [people, setPeople] = useState([]);
    const [status, setStatus] = useState({});

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
            case "status": {
                setStatus(payload);
                break;
            }
            default:
                break;
        }
    };

    const sendData = (data) => {
        client.send(JSON.stringify(data));
    };

    const addLike = (id) => {
        sendData(["like", id]);
    };

    const addDislike = (id) => {
        sendData(["dislike", id]);
    };

    const SwipeButtons = () => {
        return (
            <div className="swipeButtons">
                <IconButton className="swipeButtons__left" onclick={addDislike}>
                    <CloseIcon fontSize="large" />
                </IconButton>
                <IconButton className="swipeButtons__right" onclick={addLike}>
                    <FavoriteIcon fontSize="large" />
                </IconButton>
            </div>
        );
    };

    return (
        <div>
            <div className="cardContainer">
                {people.map((person) => (
                    <TinderCard className="swipe" key={person.name} preventSwipe={["up", "down"]}>
                        <div style={{ backgroundImage: `url(${person.url})` }} className="card">
                            <h3>{person.name}</h3>
                        </div>
                    </TinderCard>
                ))}
            </div>
            <div className="swipeButtonContainer">
                <SwipeButtons />
            </div>
        </div>
    );
};

export default Card;
