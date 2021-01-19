import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("dotenv-defaults").config();

const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const WebSocket = require("ws");

import Image from "./models/image.js";
import User from "./models/user.js";
import Message from "./models/message.js";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
var userID = "1";
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
            sendData(["status", s]);
        };

        Message.find()
            .limit(100)
            .sort({ _id: 1 })
            .exec((err, res) => {
                if (err) throw err;
                // initialize app with existing messages
                sendData(["initMsg", res]);
            });
        User.find({ id: { $not: { $regex: userID } } })
            .sort({ _id: 1 })
            .exec((err, res) => {
                if (err) throw err;
                console.log(res);
                // initialize app with existing users
                sendData(["initCard", res]);
            });
        // Image.create(
        //   {buffer: 'data:image/png;base64,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'}
        // )

        // var Hi_url="60040f3741ef153e7cd5e71f"
        // Image.findById({_id: Hi_url}, (err, image) => {
        //   if(err){
        //       console.log(err);
        //       return;
        //   }
        //   if (!image.buffer){
        //     console.log('no such image')
        //   }
        //   sendData(["Image",{imagebuffer: image.buffer } ])
        // })

        ws.onmessage = (message) => {
            const { data } = message;
            const [task, payload] = JSON.parse(data);

            switch (task) {
                case "sendfile": {
                    console.log("receive: sendfile");
                    //// payload={"filedata": filedata}
                    const { filedata } = payload;
                    Image.create({ buffer: filedata }, (err, img) => {
                        if (err) {
                            console.log("img");
                            console.log(err);
                            return;
                        }
                    });
                }
                case "getImageByID": {
                    console.log("receive: getImageByID");
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
                case "setUser": {
                    User.find({ id: userID })
                        .sort({ _id: 1 })
                        .exec((err, res) => {
                            if (err) throw err;
                            console.log(res);
                            sendData(["initUser", res]);
                        });
                    break;
                }
                case "like": {
                    const { id } = payload;
                    console.log(id);
                    User.updateOne({ id: userID }, { $addToSet: { like: id } }, (err, res) => {
                        if (err) throw err;
                    });
                    User.updateOne({ id: id }, { $addToSet: { likedBy: userID } }, (err, res) => {
                        if (err) throw err;
                    });
                    User.find({ id: userID }).exec((err, res) => {
                        if (err) throw err;
                        console.log(res);
                        sendData(["likeList", res[0].like]);
                        sendData(["likedByList", res[0].likedBy]);
                    });
                    User.find({ id: id }).exec((err, res) => {
                        if (err) throw err;
                        console.log(res);
                    });
                    break;
                }
                case "dislike": {
                    const { id } = payload;
                    User.updateOne({ id: userID }, { $addToSet: { dislike: id } }, (err, res) => {
                        if (err) throw err;
                    });
                    User.updateOne({ id: id }, { $addToSet: { dislikeBy: userID } }, (err, res) => {
                        if (err) throw err;
                    });
                    User.find({ id: { $in: [userID, id] } }).exec((err, res) => {
                        if (err) throw err;
                        console.log(res);
                    });
                    break;
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

    const PORT = process.env.port || 4000;

    server.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`);
    });
});
