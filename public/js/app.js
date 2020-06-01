console.log("Client side javascript file is loaded!! ")

/*fetch('http://puzzle.mead.io/puzzle').then((response)=>{//here it is parsing the url and after the url is passed then the callback is called .
    response.json().then((data)=>{//here response.json() is when you get the json object then do the following
        console.log(data)
    })
})*/

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault() //prevent browser from re-loading the page
    const location = searchElement.value
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = "Please Enter the Location"
        }else{
            messageOne.textContent = data.Place
            messageTwo.textContent = JSON.stringify(data.forecast)
        }
       
    })
})

    console.log(location)
})