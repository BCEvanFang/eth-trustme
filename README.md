# Trustme Ethereum

## 以太坊版本的Trustme

Commands
```sh
# Install dependencies
npm install

# Compile
truffle compile

# Deploy to network
truffle migrate

# Reset last migration
truffle migrate --reset

# Enter truffle console mode
truffle console

# Get contract version
ProductContract.at("0xdf05de37a103ae02b1110d492ba929211770a63a").getVersion.call();

# Get product by id
ProductContract.at("0xdf05de37a103ae02b1110d492ba929211770a63a").getProduct.call(12);
```