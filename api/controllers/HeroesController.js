module.exports = {
  list: async (req, res) => {
    const heroes = await Hero.find();
    return res.json(heroes);
  },
  listwithgun: async (req, res) => {
    try {
      const query = "SELECT * FROM hero INNER JOIN gun ON hero.id = gun.owner";
      const heroes = await Hero.getDatastore().sendNativeQuery(query);

      if (heroes.rows && heroes.rows.length > 0) {
        return res.json(heroes.rows);
      } else {
        return res.json([]);
      }
    } catch (err) {
      return res.serverError(err);
    }
  },
  
  //Temos um create na linha 21
  create: async (req, res) => {
    try {
      const hero = await Hero.create(req.body).fetch(); // De acordo com a biblioteca sails .create() Cria um registro no banco de dados, e a função que tá sendo chamado logo no inicio é um create
      return res.json(hero);
    } catch (err) {
      return res.serverError(err);
    }
  },
};
