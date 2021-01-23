const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const csurf = require("csurf");

const { MM_KEY } = require("./secrets.json");
const axios = require("axios");

app.use(
    express.json({
        extended: false,
    })
);

app.use(compression());

const cookieSessionMiddleware = cookieSession({
    secret: `Kill them with kindness`,
    maxAge: 1000 * 60 * 60 * 24 * 7 * 6,
});

app.use(cookieSessionMiddleware);

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.post("/api/song", (req, res) => {
    var options = {
        method: "GET",
        url: `https://api.musixmatch.com/ws/1.1/artist.search`,
        params: {
            format: "json",
            q_artist: req.body.value,
            apikey: MM_KEY,
            page_size: 10,
        },
    };
    axios
        .request(options)
        .then((response) => {
            console.log(response.data);
            res.json(response.data.message.body);
        })
        // return response.data.message.body;
        .catch(function (error) {
            console.error(error);
        });
});

app.post("/api/getSong", (req, res) => {
    var options = {
        method: "GET",
        url: `https://api.musixmatch.com/ws/1.1//track.lyrics.get`,
        params: {
            format: "json",
            track_id: req.body.value,
            apikey: MM_KEY,
        },
    };
    axios
        .request(options)
        .then((response) => {
            console.log(response.data);
            res.json(response.data.message.body);
        })
        // return response.data.message.body;
        .catch(function (error) {
            console.error("error in getting song lyrics ", error);
        });
});

// app.post("/api/getAlbum", (req, res) => {
//     var options = {
//         method: "GET",
//         url: `https://api.musixmatch.com/ws/1.1//album.get`,
//         params: {
//             format: "json",
//             album_id: req.body.value,
//             apikey: MM_KEY,
//         },
//     };
//     axios
//         .request(options)
//         .then((response) => {
//             console.log(response);
//             // res.json(response.data);
//         })
//         // return response.data.message.body;
//         .catch(function (error) {
//             console.error("error in getting artist albums ", error);
//         });
// });

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
