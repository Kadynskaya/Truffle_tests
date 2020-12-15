const MyStandardToken = artifacts.require("MyStandardToken");

module.exports = function (deployer) {
  const _name = "MyStandardToken";
  const _symbol = "MST";

  deployer.deploy(MyStandardToken, _name, _symbol);
};