const MyToken = artifacts.require('MyToken');

contract("MyToken", async (accounts) => {

    const [ deployer, firstAccount, secondAccount ] = accounts;

    let mintingAmount = 50000;
    let transferAmount = 10000;

    before(async () => {
        this.token = await MyToken.new({ from: deployer });
    });

    it("should show the name of token 'MyToken'", async () => {
        let name = await this.token.name.call();
        assert.equal(name, "MyToken", "the name is wrong");
    });

    it("should show the symbol of token 'MTK'", async () => {
        let symbol = await this.token.symbol.call();
        assert.equal(symbol, "MTK", "the symbol is wrong");
    });

    it("should show decimals of token 18", async () => {
        let decimals = await this.token.decimals.call();
        assert.equal(decimals.toNumber(), 18, "decimals is wrong");
    });

    it("should show the initial balance of deployer", async () => {
        let balance = await this.token.balanceOf.call(deployer);
        assert.equal(balance.valueOf(), 0, "deployer balance is wrong");
    })

    it("deployer can mint tokens", async () => {
        await this.token.mint(deployer, mintingAmount, { from: deployer });
        let balance = await this.token.balanceOf.call(deployer);
        assert.equal(balance.valueOf(), mintingAmount, "deployer balance is wrong");
    });

    it("should transfer right token", async () => {
        await this.token.transfer(firstAccount, transferAmount);

        let balance = await this.token.balanceOf.call(deployer);
        assert.equal(balance.toNumber(), (mintingAmount - transferAmount), 'deployer balance is wrong');

        balance = await this.token.balanceOf.call(firstAccount);
        assert.equal(balance.toNumber(), transferAmount, 'firstAccount balance is wrong');
    });

    it("should give firstAccount authority to spend deployer's token", async () => {
        await this.token.approve(firstAccount, transferAmount);
        await this.token.allowance.call(deployer, firstAccount);
        await this.token.transferFrom(deployer, secondAccount, transferAmount, { from: firstAccount });

        let balance = await this.token.balanceOf.call(deployer);
        assert.equal(balance.toNumber(), (mintingAmount - (transferAmount * 2)), 'deployer balance is wrong');

        balance = await this.token.balanceOf.call(firstAccount);
        assert.equal(balance.toNumber(), transferAmount, 'firstAccount balance is wrong');

        balance = await this.token.balanceOf.call(secondAccount);
        assert.equal(balance.toNumber(), transferAmount, 'secondAccount balance is wrong');
    });

    it("should check the Transfer event", async () => {
        let result = await this.token.transfer(firstAccount, transferAmount, { from: deployer });
        let log = result.logs[0];
        
        assert.equal(log.event, 'Transfer');
        assert.equal(log.args._from, deployer);
        assert.equal(log.args._to, firstAccount);
        assert.equal(log.args._value, transferAmount);
    });

    it("should check the Approval event", async () => {
        let result = await this.token.approve(firstAccount, transferAmount, { from: deployer });
        let log = result.logs[0];
        
        assert.equal(log.event, 'Approval');
        assert.equal(log.args._from, deployer);
        assert.equal(log.args._to, firstAccount);
        assert.equal(log.args._value, transferAmount);
    });
})