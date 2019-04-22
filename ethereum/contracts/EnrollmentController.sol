pragma solidity ^0.4.23;

import "./EnrollmentProof.sol";
import "./lib/Mother.sol";

contract EnrollmentController is Mother{
    
    /* DEFINITIONS */
    mapping(address => bool) collegiate;
    mapping(address => bool) students;
    mapping(address => address) documents;

    /* MODIFIERS */
    modifier onlyCollegiate{
        require(collegiate[msg.sender], "Allowed only for collegiate");
        _;
    }
    
    modifier onlyStudent{
        require(students[msg.sender], "Allowed only for students");
        _;
    }
    
    modifier onlyCollegiateOrStudent{
        require(collegiate[msg.sender] || students[msg.sender], "Allowed only for collegiate or student");
        _;
    }
    
    /* FUNCTIONS */
    
    /* Construtor */
    constructor() public{
        collegiate[msg.sender] = true;
    }
    
    /* Setters */
    function addEnrollment(address _studentAddress, string _name, string _course, Shift _shift) public onlyCollegiate{
        address newEnrollment = new EnrollmentProof(_studentAddress, _name, _course, _shift);
        documents[_studentAddress] = newEnrollment;
        students[_studentAddress] = true;
    }

    //function addSubject(address doc, )
    
    function getEnrollment(address _studentAddress) public view returns(EnrollmentProof){
        require(students[_studentAddress], "Endereço não pertence a um student");
        EnrollmentProof doc = EnrollmentProof(documents[_studentAddress]);
        return doc;
    }
    
    /* Getters */
    function isFromCollegiate() public view returns(bool){
        return collegiate[msg.sender];
    }
    
    function isFromCollegiate(address _conta) public view returns(bool){
        return collegiate[_conta];
    }
    
    function isStudent() public view returns(bool){
        return students[msg.sender];
    }
    
    function isStudent(address _studentAddress) public view returns(bool){
        return students[_studentAddress];
    }
}