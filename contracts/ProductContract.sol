pragma solidity ^0.4.16;

contract ProductContract {
    
    struct Product {
        uint64 id;
        string name;
        string code; // product code
    }
    
    // Product unique id(id) => Product
    mapping(uint64=>Product) products;
    
    constructor() public {
        //
    }

    function getVersion() public pure returns (string) {
        return "0.1";
    }
    
    // Add
    function addProduct(uint64 _id, string _name, string _code) public {
        
        Product storage _p = products[_id];
        
        // Check product exists
        require(_p.id == 0, "Product code already exists");
        
        // Check product code cannot be empty
        require(bytes(_code).length > 0, "Product code cannot be empty");
        
        products[_id] = Product({
            id: _id,
            name: _name,
            code: _code
        });
    }
    
    // 取得產品
    function getProduct(uint64 _id) public view returns(uint64 id, string name, string code) {
        Product storage _p = products[_id];
        return (_p.id, _p.name, _p.code);
    }
}