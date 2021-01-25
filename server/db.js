var spicedPg = require("spiced-pg");
var db = spicedPg(
    process.env.DATABASE_URL || "postgres:rens:social@localhost:5432/social"
);

module.exports.imageToSql = (url, lyrics, fonts) => {
    const k = "INSERT INTO shareify (url,lyrics,fonts) VALUES ($1,$2,$3) RETURNING id";
    const params = [url, lyrics, fonts];
    return db.query(k, params);
};

module.exports.getSqlImage = (id) => {
    const k = "SELECT url, lyrics,fonts FROM shareify WHERE id = ($1)";
    const params = [id];
    return db.query(k,params);
};