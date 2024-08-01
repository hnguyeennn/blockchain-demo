// contracts/StudentManagement.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
//Hợp đồng thông minh quản lý thông tin sinh viên
contract StudentManagement{
    struct Student {
        uint id;
        string name;
        uint age;
    }

    mapping(uint => Student) public students;
    uint public studentCount;

    //Sự kiện thêm một sinh viên mới
    event StudentAdded(uint id, string name, uint age);

    //Hàm thêm sinh viên mới
    function addStudent(string memory _name, uint _age) public {
        studentCount++;
        students[studentCount] = Student(studentCount, _name, _age);
        emit StudentAdded(studentCount, _name, _age);
    }

    //Hàm lấy ra thông tin sinh viên
    function getStudent(uint _id) public view returns (Student memory) {
        return students[_id];
    }
    
}