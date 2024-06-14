module.exports = {
  attributes: {
    name: {
      type: "string", /*
       Encontrei um erro tentando dar sails lift que foi esse "In the `name` attribute of model `hero`:
      Attributes must have either a `type` property that is a non-empty string declaring
      the attribute's data type, a `model` property declaring a singular association with
      another model, or a `collection` property declaring a plural assocation with another model."
      required: true; 
      
      Então, estou consertando o model que não está especificando o tipo de dado que se espera. */
    },
    power: {
      type: "string",
      required: true,
    },
    age: {
      type: "integer",
      required: true,
    },
    secretIdentity: {
      type: "string",
      required: true,
    },
  },
};
