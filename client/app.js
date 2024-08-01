const contractABI = [
    
    
    {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "age",
            "type": "uint256"
          }
        ],
        "name": "StudentAdded",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "studentCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "students",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "age",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_age",
            "type": "uint256"
          }
        ],
        "name": "addStudent",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_id",
            "type": "uint256"
          }
        ],
        "name": "getStudent",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "age",
                "type": "uint256"
              }
            ],
            "internalType": "struct StudentManagement.Student",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      }];
const contractAddress = "0x40cc3b28b316Cdc40226836F6De41DeD36B9326a";

let studentManagement;

document.addEventListener("DOMContentLoaded", function() {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    }

    studentManagement = new web3.eth.Contract(contractABI, contractAddress);

    const studentForm = document.getElementById('studentForm');
    const studentList = document.getElementById('studentList');

    studentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const age = parseInt(document.getElementById('age').value);
        const accounts = await web3.eth.getAccounts();

        const gasEstimate = await studentManagement.methods.addStudent(name, age).estimateGas({ from: accounts[0] });

        await studentManagement.methods.addStudent(name, age).send({ from: accounts[0], gas: gasEstimate });

        displayStudents();
    });

    async function displayStudents() {
        studentList.innerHTML = '';
        const studentCount = await studentManagement.methods.studentCount().call();
        for (let i = 1; i <= studentCount; i++) {
            const student = await studentManagement.methods.students(i).call();
            const li = document.createElement('li');
            li.appendChild(document.createTextNode(`ID: ${student.id} Name: ${student.name} Age: ${student.age}`));
            studentList.appendChild(li);
        }
    }

    displayStudents();
});
