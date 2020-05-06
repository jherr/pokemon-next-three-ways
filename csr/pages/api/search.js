import pokemon from "../../pokemon.json";

export default (req, res) => {
  const filter = req.query.q ? new RegExp(req.query.q, "i") : /.*/;
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify(
      pokemon
        .filter(({ name: { english } }) => english.match(filter))
        .slice(0, 10)
    )
  );
};
