pragma solidity ^0.4.23;

contract ShiftConfig{
    enum Shift{Morning, Afternoon, Night, Integral}
}

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

contract EnrollmentProof is ShiftConfig, Allowance{
    string private name;
    string private course;
    string private ingress;
    string private period;
    Shift private shift;
    string[] subjects;
    uint subjectsCount;
    
    constructor(address _student, address _creator, string _name, string _course, string _ingress, string _period, Shift _shift) public Allowance(_creator, _student){
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

    function getInfo() public view canSee returns(address, string, string, string, string, Shift){
        return (owner, name, course, ingress, period, shift);
    }
}

contract EnrollmentController is ShiftConfig{
    
    /* DEFINITIONS */
    address collegiate;
    mapping(address => bool) students;
    mapping(address => uint) indexes;
    address[] documents;
    uint counter;

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
        counter = 0;
    }
    
    /* Setters */
    function addEnrollment(address _studentAddress, string _name, string _course, string _ingress, string _period, Shift _shift) public onlyCollegiate{
        address newEnrollment = new EnrollmentProof(_studentAddress, msg.sender, _name, _course, _ingress, _period, _shift);
        indexes[_studentAddress] = counter;
        documents.push(newEnrollment);
        counter++;
        students[_studentAddress] = true;
    }

    //function addSubject(address doc, )
    
    function getEnrollment(address _studentAddress) public view onlyCollegiate returns(address){
        require(students[_studentAddress], "It's not a student.");
        address doc = documents[ indexes[_studentAddress] ];
        return doc;
    }

    function listEnrollment() public view onlyCollegiate returns(address[]){
        return documents;
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