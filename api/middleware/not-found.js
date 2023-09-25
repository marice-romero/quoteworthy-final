const notFound = (req, res) => res.status(404).send("quoth the raven: 404");

module.exports = notFound;
