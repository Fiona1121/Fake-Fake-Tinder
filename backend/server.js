import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require("express");
const path = require("path");
const __dirname = path.resolve();
const app = express();
require("dotenv-defaults").config();
const http = require("http");
const mongoose = require("mongoose");
const WebSocket = require("ws");

import Message from "./models/message.js";
import Image from "./models/image.js";
import User from "./models/user.js";

const PORT = process.env.PORT || 4000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// app.listen(port);
console.log("Server Ready!");

//==========================================================================

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

if (!process.env.MONGO_URL) {
    console.error("Missing MONGO_URL!!!");
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
    console.error(error);
});

db.once("open", () => {
    console.log("MongoDB connected!");

    wss.on("connection", (ws) => {
        const sendData = (data) => {
            ws.send(JSON.stringify(data));
        };

        const sendStatus = (s) => {
            sendData(["status", s]); // s={att1: value1, att2: value2}
        };

        ws.onmessage = (message) => {
            const { data } = message;
            const [task, payload] = JSON.parse(data);

            switch (task) {
                case "intoChat": {
                    console.log("backend intoChat");
                    Message.find()
                        .limit(100)
                        .sort({ _id: 1 })
                        .exec((err, res) => {
                            if (err) throw err;
                            console.log(res);
                            sendData(["initMsg", res]);
                        });
                }
                case "sendfile": {
                    //console.log("receive: sendfile");
                    //// payload={"filedata": filedata}
                    const { filedata } = payload;
                    Image.create({ buffer: filedata }, (err, img) => {
                        if (err) {
                            //console.log("img");
                            console.log(err);
                            return;
                        }
                    });
                }
                case "getImageByID": {
                    //console.log("receive: getImageByID");
                    //// payload={"filedata": filedata}
                    const { ImageID } = payload;
                    Image.findById({ _id: ImageID }, (err, image) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        if (!image.buffer) {
                            console.log("no such image");
                        }
                        sendData(["Image", { imagebuffer: image.buffer }]);
                    });
                }
                //for testing by Yu

                case "sendtest": {
                    const { id, body } = payload;
                    console.log("receive sendtest");
                    console.log(payload);
                }
                case "setUser": {
                    console.log("receive: setUser");
                    const { name, sex, id, password, photodata } = payload;
                    console.log(name, sex, id, password);
                    User.countDocuments({ id: id }, (err, number) => {
                        console.log("This id has been used " + number + " times");
                        if (number >= 1) {
                            sendData(["response_for_signup", { msg: "This id has been used" }]);
                        } else if (number === 0) {
                            //console.log("start to create user")
                            User.create(
                                {
                                    id: id,
                                    password: password,
                                    name: name,
                                    sex: sex,
                                    photo: photodata,
                                },
                                (err, user) => {
                                    if (err) {
                                        console.log("user");
                                        console.log(err);
                                        return;
                                    }
                                }
                            );
                            console.log("already create user");
                            sendData(["response_for_signup", { msg: "Sign up sucessfully" }]);
                            User.find({ id: id }).exec((err, res) => {
                                if (err) throw err;
                                //console.log(res);
                                sendData(["setCardUser", res]); // res is user
                                sendData(["setAppUser", res]);
                                curUser = res;
                                // sendData(["Accountinterface_setUser",res]) // res is user >>Accountinterface_setUser
                            });
                        }
                    });
                    break;
                }
                case "userLogin": {
                    console.log("receive: userLogin");
                    const { id, password } = payload;
                    console.log(id, password);
                    User.countDocuments({ id: id }, (err, number) => {
                        if (number >= 1) {
                            console.log(`user (id: ${id} ) exist`);
                            User.countDocuments({ id: id, password: password }, (err, number) => {
                                if (number >= 1) {
                                    console.log(`user (id: ${id} ) exist and password is correct`);

                                    sendData(["response_for_login", { msg: "Welcome" }]);
                                    User.find({ id: id }).exec((err, res) => {
                                        if (err) throw err;
                                        //console.log(res);
                                        console.log(`user(id: ${id}) log in`);
                                        curUser = res;
                                        sendData(["setCardUser", res]); // res is user
                                        sendData(["setAppUser", res]);
                                        // sendData(["Accountinterface_setUser", res]);// res is user >>Accountinterface_setUser
                                    });
                                } else if (number === 0) {
                                    console.log(`user (id: ${id} ) exist but password isn't correct`);
                                    sendData(["response_for_login", { msg: "password is not correct" }]);
                                }
                            });
                        } else if (number === 0) {
                            console.log(`user (id: ${id} ) does not exist`);
                            sendData(["response_for_login", { msg: "id can not be find" }]);
                        }
                    });
                    break;
                }
                case "initHeader": {
                    const { userID } = payload;
                    sendData(["initHeader", { id: userID }]);
                }
                case "getCards": {
                    const { userID } = payload;
                    if (userID) {
                        User.find({ id: { $not: { $regex: toString(userID) } } })
                            .sort({ _id: 1 })
                            .exec((err, res) => {
                                if (err) throw err;
                                //console.log(res);
                                // initialize app with existing users
                                sendData(["initCard", res]);
                            });
                    }
                }
                case "getUser": {
                    //console.log("receive: getuser");
                    const { userID } = payload;
                    if (userID) {
                        User.find({ id: userID }).exec((err, res) => {
                            if (err) throw err;
                            //console.log(res);
                            sendData(["setCardUser", res]);
                        });
                    }
                }
                case "chat_getUser": {
                    //console.log("receive: getuser");
                    const { userID } = payload;
                    if (userID) {
                        User.find({ id: userID }).exec((err, res) => {
                            if (err) throw err;
                            //console.log(res);
                            sendData(["initChat", res]);
                        });
                    }
                }
                case "Accountinterface_getUser": {
                    //console.log("receive: Accountinterface_getUser");
                    //console.log(payload);
                    const { userID } = payload;
                    if (userID) {
                        User.find({ id: userID }).exec((err, res) => {
                            if (err) throw err;
                            //console.log("account get user: ", res[0].id);
                            sendData(["Accountinterface_setUser", res]);
                        });
                    }
                }

                case "Accountinterface_updateUser": {
                    //console.log("receive: Accountinterface_updateUser");
                    //console.log(payload);
                    const { id, user_id, infotobeupdate, newvalue } = payload;
                    const filter111 = { _id: user_id };
                    const filter = { id: id };

                    if (infotobeupdate === "name") {
                        console.log("update name");

                        const update = { name: newvalue };

                        User.findByIdAndUpdate(user_id, update, (err, user) => {
                            console.log(err);
                            User.find({ _id: user._id }).exec((err, res) => {
                                if (err) throw err;
                                //console.log(res);
                                //sendData(["Accountinterface_setUser", res]);
                            });
                        });
                    } else if (infotobeupdate === "sex") {
                        const update = { sex: newvalue };
                        User.findByIdAndUpdate(user_id, update, (err, user) => {
                            console.log(err);
                            User.find({ _id: user._id }).exec((err, res) => {
                                if (err) throw err;
                                //console.log(res);
                                //sendData(["Accountinterface_setUser", res]);
                            });
                        });
                    } else if (infotobeupdate === "password") {
                        const update = { password: newvalue };
                        User.findByIdAndUpdate(user_id, update, (err, user) => {
                            console.log(err);
                            User.find({ _id: user._id }).exec((err, res) => {
                                if (err) throw err;
                                //console.log(res);
                                //sendData(["Accountinterface_setUser", res]);
                            });
                        });
                    } else if (infotobeupdate === "id") {
                        //const update = {'password':newvalue }

                        User.countDocuments({ id: newvalue }, (err, number) => {
                            console.log("This id has been used " + number + " times");
                            if (number >= 1) {
                                //sendData(["response_for_signup", { msg: "This id has been used" }]);
                            } else if (number === 0) {
                                //console.log("start to create user")
                                const update = { id: newvalue };
                                User.findByIdAndUpdate(user_id, update, (err, user) => {
                                    console.log(err);
                                    User.find({ _id: user._id }).exec((err, res) => {
                                        if (err) throw err;
                                        //console.log(res);
                                        //sendData(["Accountinterface_setUser", res]);
                                    });
                                });
                                console.log("already update user id");
                            }
                        });
                    }
                }
                case "like": {
                    const { userID, id } = payload;
                    //console.log(id);

                    if (userID) {
                        User.updateOne({ id: userID }, { $addToSet: { like: id } }, (err, res) => {
                            if (err) throw err;
                        });
                        User.updateOne({ id: id }, { $addToSet: { likedBy: userID } }, (err, res) => {
                            if (err) throw err;
                        });
                        User.find({ id: userID }).exec((err, res) => {
                            if (err) throw err;
                            //console.log(res);
                            sendData(["likeList", res[0].like]);
                            sendData(["likedByList", res[0].likedBy]);
                        });
                        User.find({ id: id }).exec((err, res) => {
                            if (err) throw err;
                            //console.log(res);
                        });
                    }

                    break;
                }
                case "dislike": {
                    const { userID, id } = payload;
                    if (userID) {
                        User.updateOne({ id: userID }, { $addToSet: { dislike: id } }, (err, res) => {
                            if (err) throw err;
                        });
                        User.updateOne({ id: id }, { $addToSet: { dislikeBy: userID } }, (err, res) => {
                            if (err) throw err;
                        });
                        User.find({ id: { $in: [userID, id] } }).exec((err, res) => {
                            if (err) throw err; //console.log(res);
                        });
                    }
                    break;
                }

                case "messageInput": {
                    console.log("receive: messageInput");
                    console.log(payload);
                    Message.create(payload, function (err, res) {
                        //const {toId} = payload
                        sendData(["resOfSendMessage", [payload]]);

                        //sendData([`broadcast${toId}`,[payload]])
                        //console.log(`broadcast${toId}`)
                    });

                    const { toId } = payload;
                    wss.clients.forEach(function each(client) {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify([`broadcast${toId}`, [payload]]));
                        }
                    });

                    break;
                }
                case "getchatuserlist": {
                    console.log("getchatuserlist");
                    //console.log(payload)
                    const { fromId } = payload;
                    console.log("out:", fromId);
                    User.find({ id: { $ne: fromId } }).exec((err, res) => {
                        if (err) throw err;
                        //console.log(res);
                        sendData(["initchatuserlist", res]);
                    });
                }
                case "clear": {
                    Message.deleteMany({}, () => {
                        sendData(["cleared"]);

                        sendStatus({
                            type: "info",
                            msg: "Message cache cleared.",
                        });
                    });

                    break;
                }
                default:
                    break;
            }
        };
    });
});

app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "./frontend/build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});