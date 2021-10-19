const mainSec = document.createElement('section')

document.body.append(mainSec)

mainSec.setAttribute('class','main-section')

const formArea = document.createElement('div')
formArea.setAttribute('class','form')

formArea.innerHTML = `
                            <div>
                                <label>Enter Name:</label>
                                <input type='text' placeholder='enter name' class='userName'>
                            </div>
                            <div>
                                <label>Enter Pic URL:</label>
                                <input type='text' placeholder='enter pic url' class="userPic">
                            </div>
                            <div>
                                <button onclick="addFunc()">ADD <i class="fa fa-user-plus" aria-hidden="true"></i></button>
                            </div>
                        
`

mainSec.append(formArea)

const userContainer = document.createElement('div')
userContainer.setAttribute('class','user-container')

const getData = async() => {
    const resp = await fetch('https://6166c4d713aa1d00170a66f3.mockapi.io/users', {method:"GET"})
    const userData = await resp.json()

    console.log(userData)

    mainSec.append(userContainer)

    const container = mainSec.querySelector('.user-container')
    container.innerHTML = ''

    userData.forEach((user)=>{
        userContainer.innerHTML += `
                
                    <div class='user'>
                        <img src= ${user.avatar} alt=${user.name}>
                        <div class='user-info'>
                            <h1>${user.name}</h1>
                            <div class='btn-group'>
                                <button class='edit-btn' onclick="editFunc(${user.id})">Edit <i class="fa fa-pencil" aria-hidden="true"></i></button>
                                <button id=${user.id} class='delete-btn' onclick='deleteFunc(${user.id})'>Delete <i class="fa fa-trash-o" aria-hidden="true"></i></button>
                            </div>
                            <div class="edit-input display-none edit-display-${user.id}">
                                <input type="text" class='editName' id='editName-${user.id}'>
                                <input type="text" class='editPic' id='editPic-${user.id}'>
                                <button class="save-btn" onclick='saveFunc(${user.id})'>Save <i class="fa fa-floppy-o" aria-hidden="true"></i></button>
                            </div>
                        </div>
                    </div>
                
                `

        console.log(user.name)
    })

}

getData()

async function deleteFunc(id){
    console.log('clicked ' + id)

    const resp = await fetch(`https://6166c4d713aa1d00170a66f3.mockapi.io/users/${id}`, {method:"DELETE"})

    getData()
}

async function addFunc(){
    let name = document.querySelector(".userName").value
    let picURL = document.querySelector(".userPic").value

    console.log(name,picURL)

    const userData = await fetch('https://6166c4d713aa1d00170a66f3.mockapi.io/users/', {
        method:'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({name:name, avatar:picURL})    
})

    document.querySelector('.userName').value = ''
    document.querySelector('.userPic').value = ''

    getData()
}

async function editFunc(id){
    console.log("clicked " + id)

    const editUserInfo = document.querySelector(`.edit-display-${id}`)
    editUserInfo.style.display = editUserInfo.style.display === "block" ? "none" : "block"

    const resp = await fetch('https://6166c4d713aa1d00170a66f3.mockapi.io/users/')
    const userInfoArr = await resp.json()

    const findValue = userInfoArr.find((user)=>{
        console.log(user.id)
        return user.id == id
    })

    console.log(findValue)

    document.querySelector(`#editName-${id}`).value = findValue.name
    document.querySelector(`#editPic-${id}`).value = findValue.avatar
}

async function saveFunc(id){

    let name = document.querySelector(`#editName-${id}`).value
    let picURL = document.querySelector(`#editPic-${id}`).value

    console.log(name,picURL)
    const userData = await fetch(`https://6166c4d713aa1d00170a66f3.mockapi.io/users/${id}`, {
        method:'PUT',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({name:name, avatar:picURL})    
})

    document.querySelector('.editName').value = ''
    document.querySelector('.editPic').value = ''

    getData()
}