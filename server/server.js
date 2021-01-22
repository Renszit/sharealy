const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
// const { musixApi } = require("./musixApi");
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

app.post("/api/lyrics", (req, res) => {
    var options = {
        method: "GET",
        url: `https://api.musixmatch.com/ws/1.1/track.search`,
        params: {
            format: "json",
            q_artist: req.body.value,
            s_artist_rating: "desc",
            s_track_rating: "desc",
            quorum_factor: 1,
            apikey: MM_KEY,
            page_size: 10,
        },
    };
    axios
        .request(options)
        .then((response) => {
            let arr = response.data.message.body.track_list;
            console.log(arr);
            res.json(arr);
        })
        // return response.data.message.body;
        .catch(function (error) {
            console.error(error);
        });
});

app.get("/", (req, res) => {
    res.redirect("/welcome");
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
