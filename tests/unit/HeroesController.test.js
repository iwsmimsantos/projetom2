const assert = require("assert");
const controller = require("../../api/controllers/HeroesController");
const { mockAsync, RESPONSE, Hero } = require("../sinonUtils");
const sinon = require("sinon");

describe("HeroesController", () => {
  afterEach(() => {
    // Restore the original methods after each test
    sinon.restore();
  });

  it("Deve retornar todos os usuários", async () => {
    //ARRANGE
    const findStub = mockAsync(controller, "find", HERO);

    //ACT
    const result = await controller.find();

    //ASSERT
    assert.strictEqual(findStub.calledOnce, true);
    assert.deepStrictEqual(result, HERO);
  });

  it("Deve retornar um usuário específico", async () => {
    //ARRANGE
    const heroId = 120;
    const findOneStub = mockAsync(controller, "findOne", Hero);

    //ACT
    const result = await controller.findOne({ params: { id: HeroId } }, RESPONSE);

    //ASSERT
    assert.strictEqual(findOneStub.calledOnce, true);
    assert.deepStrictEqual(result, Hero);
  });

  it("Deve criar um usuário com sucesso", async () => {
    //ARRANGE
    const createStub = mockAsync(controller, "create", Hero);
    const req = {
      body: Hero
    };
    //ACT
    const result = await controller.create(req, RESPONSE);

    //ASSERT
    assert.strictEqual(createStub.calledOnce, true);
    assert.deepStrictEqual(result, req.body);
  });
  it("Deve retornar erro ao tentar criar usuário com dados incompletos", async () => {
    //ARRANGE
    const req = { body: { name: "Test Hero" } }; // Faltando campos obrigatórios
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    //ACT
    await controller.create(req, res);

    //ASSERT
    assert.strictEqual(res.status.calledOnceWith(400), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { error: 'Email and password are required' });
  });

  it("Deve atualizar um usuário com sucesso", async () => {
    //ARRANGE
    const HeroId = 120;
    const updatedHero = { ...Hero, name: "Updated Hero" };
    const updateStub = mockAsync(controller, "update", updatedHero);
    const req = { params: { id: HeroId }, body: updatedHero };
    const res = { json: sinon.stub() };

    //ACT
    await controller.update(req, res);

    //ASSERT
    assert.strictEqual(updateStub.calledOnce, true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], updatedHero);
  });

  it("Deve retornar erro ao tentar atualizar usuário inexistente", async () => {
    //ARRANGE
    const HeroId = 999;
    const req = { params: { id: HeroId }, body: { name: "Updated Hero" } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    //ACT
    await controller.update(req, res);

    //ASSERT
    assert.strictEqual(res.status.calledOnceWith(404), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { error: 'Hero not found' });
  });

  it("Deve deletar um usuário com sucesso", async () => {
    //ARRANGE
    const HeroId = 120;
    const deletedHero = Hero;
    const destroyStub = mockAsync(controller, "destroy", deletedHero);
    const req = { params: { id: HeroId } };
    const res = { json: sinon.stub() };

    //ACT
    await controller.destroy(req, res);

    //ASSERT
    assert.strictEqual(destroyStub.calledOnce, true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { message: 'Hero deleted successfully' });
  });

  it("Deve retornar erro ao tentar deletar usuário inexistente", async () => {
    //ARRANGE
    const HeroId = 999;
    const req = { params: { id: HeroId } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    //ACT
    await controller.destroy(req, res);

    //ASSERT
    assert.strictEqual(res.status.calledOnceWith(404), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { error: 'Hero not found' });
  });

  it("Deve autenticar um usuário com sucesso", async () => {
    //ARRANGE
    const loginStub = mockAsync(controller, "login", Hero);
    const req = { body: { email: Hero.email, password: Hero.password } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    //ACT
    await controller.login(req, res);

    //ASSERT
    assert.strictEqual(loginStub.calledOnce, true);
    assert.strictEqual(res.status.calledOnceWith(200), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { Hero: Hero });
  });

  it("Deve retornar erro ao tentar autenticar com email não existente", async () => {
    //ARRANGE
    const req = { body: { email: "nonexistent@example.com", password: Hero.password } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    //ACT
    await controller.login(req, res);

    //ASSERT
    assert.strictEqual(res.status.calledOnceWith(404), true);
    assert.strictEqual(res.json.calledOnce, true);
    assert.deepStrictEqual(res.json.firstCall.args[0], { error: 'Hero not found' });
  });
  
});