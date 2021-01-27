const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const { MM_KEY, RAPID_API } = require("./secrets.json");
const axios = require("axios");
const db = require("./db");

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

app.post("/imageToSql", (req, res) => {
    db.imageToSql(
        req.body.url,
        req.body.track,
        req.body.lyrics,
        req.body.artist,
        req.body.fonts,
        req.body.youtube
    )
        .then(({ rows }) => {
            const { id } = rows[0];
            res.json({
                success: true,
                id: id,
            });
        })
        .catch((err) => console.log("error in posting to sql", err));
});

app.get("/app/shared/:id", (req, res) => {
    console.log("params id:", req.params.id);
    db.getSqlImage(req.params.id)
        .then(({ rows }) => {
            // console.log(result);
            const { url, track, lyrics, artist, fonts, youtube } = rows[0];
            // console.log("grabbing the right ur;", url);
            res.json({
                url: url,
                track: track,
                lyrics: lyrics,
                artist: artist,
                fonts: fonts,
                youtube: youtube,
            });
        })
        .catch((err) => console.log("error in getting image", err));
});

app.post("/api/artist", (req, res) => {
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

app.post("/api/images", (req, res) => {
    var options = {
        method: "GET",
        url:
            "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI",
        params: {
            q: req.body.value,
            pageNumber: "1",
            pageSize: "19",
            autoCorrect: "true",
            safeSearch: "true",
        },
        headers: {
            "x-rapidapi-key": RAPID_API,
            "x-rapidapi-host":
                "contextualwebsearch-websearch-v1.p.rapidapi.com",
        },
    };

    axios
        .request(options)
        .then(function (response) {
            res.json(response.data.value);
            // console.log("THIS ONE:",response.data.value);
        })
        .catch(function (error) {
            console.error(error);
        });
});

app.post("/api/song", (req, res) => {
    var options = {
        method: "GET",
        url: `https://api.musixmatch.com/ws/1.1/track.search`,
        params: {
            format: "json",
            q_artist: req.body.name,
            q_track: req.body.value,
            apikey: MM_KEY,
            page_size: 3,
            s_track_rating: "desc",
            f_has_lyrics: true,
        },
    };
    axios
        .request(options)
        .then(function (response) {
            res.json(response.data.message.body.track_list);
            // console.log("THIS ONE:",response.data.message.body.track_list);
        })
        .catch(function (error) {
            console.error(error);
        });
});

app.post("/api/lyrics", (req, res) => {
    var options = {
        method: "GET",
        url: `https://api.musixmatch.com/ws/1.1/track.snippet.get`,
        params: {
            format: "json",
            track_id: req.body.value,
            apikey: MM_KEY,
        },
    };
    axios
        .request(options)
        .then(function (response) {
            res.json(response.data.message.body.snippet);
        })
        .catch(function (error) {
            console.error(error);
        });
});

app.post("/api/youtube", (req, res) => {
    let track = req.body.track.replace(/\s/g, "+");
    let artist = req.body.artist.replace(/\s/g, "+");

    var options = {
        method: "GET",
        url: "https://youtube-search-results.p.rapidapi.com/youtube-search/",
        params: { q: track + artist },
        headers: {
            "x-rapidapi-key": RAPID_API,
            "x-rapidapi-host": "youtube-search-results.p.rapidapi.com",
        },
    };

    axios
        .request(options)
        .then(function (response) {
            // console.log(response.data.items);
            res.json(response.data.items);
        })
        .catch(function (error) {
            console.error(error);
        });
});

app.get("/db/recent", (req, res) => {
    db.getRecent().then(({ rows }) => res.json(rows));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
