//se não conectar o banco de dados não é possível fazer as requisições necessárias como o post, get. etc. Conectei o meu render aqui

module.exports.datastores = {
  default: {
    adapter: "sails-postgresql", //estou usando o postgresql para o banco de dados
    url: "postgres://ias_user:SGbya6dla59fz9kd3ZMpkWzkTtCliXI9@dpg-cp7jglmd3nmc73bssabg-a.oregon-postgres.render.com/ias", //URL do meu banco de dados
    ssl: true, 
  },
};
