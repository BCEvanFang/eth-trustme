App = {
    web3Provider: null,
    contracts: {},

    init: function () {
        return App.initWeb3();
    },

    initWeb3: function () {
        // Is there an injected web3 instance?
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
        } else {
            // If no injected web3 instance is detected, fall back to Ganache
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        web3 = new Web3(App.web3Provider);

        return App.initContract();
    },

    initContract: function () {

        $.getJSON('ProductContract.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract
            var ProductContractArtifact = data;
            App.contracts.ProductContract = TruffleContract(ProductContractArtifact);

            // Set the provider for our contract
            App.contracts.ProductContract.setProvider(App.web3Provider);

            // Use our contract to retrieve and mark the adopted pets
            // return App.markAdopted();
            return App.showVersion(); 
        });

        return App.bindEvents();
    },

    bindEvents: function () {
        $(document).on('click', '#addProductBtn', App.handleAdd);
        $(document).on('click', '#getProductBtn', App.handleGet);
    },

    // 顯示智能合約版本號
    showVersion() {
        App.contracts.ProductContract.deployed().then(function(instance){
            return instance.getVersion.call();
        }).then(function(version){
            $("#version").text(version)
        });
    },

    // 增加產品
    handleAdd: function (event) {
        //
        event.preventDefault();
        //
        let id = $("#productId").val();
        let name = $("#productName").val();
        let code = $("#productCode").val();

        web3.eth.getAccounts(function (error, accounts) {
            //
            if (error) {
                console.error(error);
            }
            // Get default account
            var account = accounts[0];
            //
            App.contracts.ProductContract.deployed().then(function (instance) {
                // Execute addProduct as a transaction by sending account
                return instance.addProduct(id, name, code, { from: account });
                //
            }).then(function (result) {
                //
                console.log("result");
                console.log(result);
                alert('Add success!')
                //
            }).catch(function (err) {
                //
                console.log(err.message);
            });
        });
    }, 
    
    handleGet: function(event) {
        //
        event.preventDefault();
        
        $("#productInfo").text("");

        let id = $("#getProductId").val();
        //
        web3.eth.getAccounts(function (error, accounts) {
            //
            if (error) {
                console.log(error);
            }
            //
            var account = accounts[0];
            //
            App.contracts.ProductContract.deployed().then(function (instance) {
                //
                return instance.getProduct(id, { from: account });
            }).then(function (result) {
                //
                console.log(result);
                
                let productId = parseInt(result[0]);
                let productName = result[1];
                let productCode = result[2];
                
                $("#productInfo").text("Id: " + productId + ", Name: " + productName + ", Code: " + productCode);
                //
            }).catch(function (err) {
                console.err(err.message);
            });
        });
    }, // end handleGet

};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
