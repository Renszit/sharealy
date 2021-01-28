var spicedPg = require("spiced-pg");
var db = spicedPg(
    process.env.DATABASE_URL || "postgres:rens:social@localhost:5432/social"
);

module.exports.imageToSql = (url, track, lyrics, artist, fonts, youtube) => {
    const k =
        "INSERT INTO shareify (url,track,lyrics,artist,fonts,youtube) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id";
    const params = [url, track, lyrics, artist, fonts, youtube];
    return db.query(k, params);
};

module.exports.getSqlImage = (id) => {
    const k = "SELECT id,url,track,lyrics,artist,fonts,youtube FROM shareify WHERE id = ($1)";
    const params = [id];
    return db.query(k, params);
};

module.exports.getRecent = () => {
    const q = `SELECT id, artist,lyrics FROM shareify ORDER BY id DESC LIMIT 10`;
    return db.query(q);
};
