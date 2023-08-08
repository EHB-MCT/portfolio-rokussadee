import {io} from "socket.io-client";

localStorage.debug = 'socket.io-client:socket'
console.log("clientjs loaded")

const socket = io('http://localhost:3000')

let userRole;

let rollCount = 0;

socket.on('connect', () => {
  console.log(`Connected with id ${socket.id}`)
})

socket.on('remove-role', (role) => {
  console.log("removed role:", role)
  disableRole(role)
})

socket.on('increment-rollcount', () => {
  rollCount += 1;
  console.log(rollCount);
  if(rollCount === 3) nextPage()
})

socket.on('next-page', () => {
  console.log('next-page receive')
  nextPage()
})

let roleButtons = document.querySelectorAll(".button")

Array.prototype.forEach.call(roleButtons, element => {
  console.log(element)
  element.addEventListener('click', (e) => {
    e.preventDefault()
    const role = element.getAttribute("name")
    console.log("client input value:", role)
  
    if(role === '') return
  
    socket.emit('set-role', role)
    setUserRole(role)
  })
});

function setUserRole(role) {
  userRole = role;
  disableRole(role)
}


function disableRole(role) {
  console.log("client role:", role)
  const roleButton = document.getElementById(`${role}`) 
  roleButton.setAttribute("disabled", true)

  if(userRole == role) {
    console.log('styling role') 
    roleButton.style.borderColor = "blue"
    roleButton.style.color = "blue"
  }
}

function nextPage() {
  const container = document.getElementById("instrument-container")

  const element = document.createElement("div")
  element.textContent = userRole
  container.appendChild(element)
//  loadInstrument(userRole)
}
