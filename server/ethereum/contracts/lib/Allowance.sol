pragma solidity ^0.4.23;

contract Allowance{
    address public creator;
    address public owner;
    mapping(address => bool) allowedList;
    
    constructor(address _creator, address _owner) public{
        creator = _creator;
        owner = _owner;
        allowedList[creator] = true;
        allowedList[owner] = true;
    }

    modifier canSee(){
        require(allowedList[msg.sender] || msg.sender == owner, "Not allowed");
        _;
    }

    modifier onlyCreator(){
        require(msg.sender == creator, "Only allowed for creator");
        _;
    }
    
    modifier onlyOwner(){
        require(msg.sender == owner, "Only allowed for owner");
        _;
    }
    
    modifier onlyCreatorOrOwner(){
        require(msg.sender == creator || msg.sender == owner, "Only allowed for creator or owner");
        _;
    }
    
    /* ALLOWANCE */

    function allow(address account) public onlyCreatorOrOwner{
        allowedList[account] = true;
    }

    function disallow(address account) public onlyCreatorOrOwner{
        allowedList[account] = false;
    }

    function isAllowed(address account) public view returns(bool){
        return allowedList[account];
    }

    function imAllowed() public view returns(bool){
        return allowedList[msg.sender];
    }
}