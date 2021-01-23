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

app.post("/api/artist", (req, res) => {
    var options = {
        method: "GET",
        url: `https://api.musixmatch.com/ws/1.1//artist.search`,
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
            res.json(response.data.message.body);
        })
        // return response.data.message.body;
        .catch(function (error) {
            console.error(error);
        });
});

app.post("/api/getArtist", (req, res) => {
    var options = {
        method: "GET",
        url: `https://api.musixmatch.com/ws/1.1//artist.albums.get`,
        params: {
            format: "json",
            artist_id: req.body.value,
            s_release_date: "desc",
            apikey: MM_KEY,
        },
    };
    axios
        .request(options)
        .then((response) => {
            res.json(response.data);
        })
        // return response.data.message.body;
        .catch(function (error) {
            console.error(error);
        });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
