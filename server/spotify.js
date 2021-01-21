const Spotify = require("node-spotify-api");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {
    secrets = require("./secrets.json");
}

var spotify = new Spotify({
    id: secrets.SPOT_ID,
    secret: secrets.SPOT_SECRET,
});

module.exports.getSpotifyToken() {


}
var options = {
  method: 'POST',
  url: 'https://spotifystefan-skliarovv1.p.rapidapi.com/getTracks',
  headers: {
    'x-rapidapi-key': '5043d52804mshcf2ee3fbccb2310p18bb90jsnf9a047a740ae',
    'x-rapidapi-host': 'Spotifystefan-skliarovV1.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});