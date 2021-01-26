var spicedPg = require("spiced-pg");
var db = spicedPg(
    process.env.DATABASE_URL || "postgres:rens:social@localhost:5432/social"
);

module.exports.imageToSql = (url, lyrics, artist, fonts) => {
    const k =
        "INSERT INTO shareify (url,lyrics,artist,fonts) VALUES ($1,$2,$3,$4) RETURNING id";
    const params = [url, lyrics, artist, fonts];
    return db.query(k, params);
};

module.exports.getSqlImage = (id) => {
    const k = "SELECT url,lyrics,artist,fonts FROM shareify WHERE id = ($1)";
    const params = [id];
    return db.query(k, params);
};

module.exports.getRecent = () => {
    const q = `SELECT id,artist,lyrics FROM shareify ORDER BY id DESC LIMIT 5`;
    return db.query(q);
};
