const MyStandardToken = artifacts.require('MyStandardToken');

contract("MyStandardToken", async (accounts) => {

    it("should show the name of token 'MyStandardToken'", async () => {
        let instance = await MyStandardToken.deployed();
        let name = await instance.name.call();
        assert.equal(name, "MyStandardToken", "the name is wrong");
    });

    it("should show the symbol of token 'MST'", async () => {
        let instance = await MyStandardToken.deployed();
        let symbol = await instance.symbol.call();
        assert.equal(symbol, "MST", "the symbol is wrong");
    });
})