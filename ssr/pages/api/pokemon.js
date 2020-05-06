import pokemon from "../../pokemon.json";

export default (req, res) => {
  if (!req.query.name) {
    res.statusCode = 400;
    res.end("Must have a name");
  } else {
    const found = pokemon.filter(
      ({ name: { english } }) => english === req.query.name
    );
    if (found.length === 0) {
      res.statusCode = 404;
      res.end(`Pokemon ${req.query.name} not found`);
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(found[0]));
    }
  }
};
