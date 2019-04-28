pragma solidity ^0.4.23;

//import "./lib/Mother.sol";
import "./lib/Allowance.sol";

enum Shift{Morning, Afternoon, Night, Integral}

contract EnrollmentProof is Mother, Allowance{
    string private name;
    string private course;
    string private ingress;
    string private period;
    Shift private shift;
    string[] subjects;
    uint subjectsCount;
    
    constructor(address _student, string _name, string _course, string _ingress, string _period, Shift _shift) public Allowance(msg.sender, _student){
        name = _name;
        course = _course;
        ingress = _ingress;
        period = _period;
        shift = _shift;
        subjectsCount = 0;
    }

    /* Controll */
    function addSubject(string subject) public onlyCreator{
        subjects.push(subject);
        subjectsCount++;
    }

    function getSubjectAmount() public view canSee returns(uint count){
        return subjectsCount;
    }

    function getSubject(uint index) public view canSee returns(string subject){
        return subjects[index];
    }

    /* GETTERS */

    function getName() public view canSee returns(string){
        return name;
    }

    function getCourse() public view canSee returns(string){
        return course;
    }

    function getShift() public view canSee returns(Shift){
        return shift;
    }
}

contract EnrollmentController is Mother{
    
    /* DEFINITIONS */
    address collegiate;
    mapping(address => bool) students;
    mapping(address => address) documents;

    /* MODIFIERS */
    modifier onlyCollegiate{
        require(msg.sender == collegiate, "Allowed only for collegiate");
        _;
    }
    
    modifier onlyStudent{
        require(students[msg.sender], "Allowed only for students");
        _;
    }
    
    modifier onlyCollegiateOrStudent{
        require(msg.sender == collegiate || students[msg.sender], "Allowed only for collegiate or student");
        _;
    }
    
    /* FUNCTIONS */
    
    /* Construtor */
    constructor() public{
        collegiate = msg.sender;
    }
    
    /* Setters */
    function addEnrollment(address _studentAddress, string _name, string _course, string _ingress, string _period, Shift _shift) public onlyCollegiate{
        address newEnrollment = new EnrollmentProof(_studentAddress, _name, _course, _ingress, _period, _shift);
        documents[_studentAddress] = newEnrollment;
        students[_studentAddress] = true;
    }

    //function addSubject(address doc, )
    
    function getEnrollment(address _studentAddress) public view onlyCollegiate returns(EnrollmentProof){
        EnrollmentProof doc = EnrollmentProof(documents[_studentAddress]);
        return doc;
    }
    
    /* Getters */
    function imCollegiate() public view returns(bool){
        return (msg.sender == collegiate);
    }
    
    function isCollegiate(address _conta) public view returns(bool){
        return _conta == collegiate;
    }
    
    function imStudent() public view returns(bool){
        return students[msg.sender];
    }
    
    function isStudent(address _studentAddress) public view returns(bool){
        return students[_studentAddress];
    }
}