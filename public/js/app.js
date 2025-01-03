console.log('client side js file loaded')


const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchTerm.value

    messageOne.textContent = 'Loading ...'

    //fetch api
    fetch('/weather?address='+ location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = ''
                messageTwo.textContent = data.error
            }else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }      
        })
    })

})