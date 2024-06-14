const { identity } = require("sails-postgresql");
const sinon = require("sinon");

const mockAsync = (model, module, result = null) => {
  return sinon.stub(model, module).resolves(result);
};

const RESPONSE = {
  json: function (data) {
    return data;
  },
};

const HERO = {
    name: "ladybug",
    power: "fly",
    age: "189",
    secret_identity: "iasmim"
}

const HEROES = ['iasmim'];

const IDHEROES = [1];

module.exports = {
  mockAsync,
  RESPONSE,
  HEROES
};