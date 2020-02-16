console.log('this is javascript file')

// fetch('http://puzzle.mead.io/puzzle')
// .then((response) =>{
//     response.json().then((data) =>{
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=qwhhhdd')
// .then((response) =>{
//     //console.log(response)
//     response.json()
//    .then((data) =>{
//        if(data.error){
//            console.log(data.error)
//        } else{
//            console.log(data.location)
//            console.log(data.weathersummary)
//        }
//    }) 
//    .catch((error) =>{
//     console.log(error)
// }) 
// })
// .catch((error) =>{
//     console.log(error)
// })

const form = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.getElementById('msg1')
const msg2 = document.getElementById('msg2')
const msg3 = document.getElementById('msg3')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    msg1.textContent='loading...'
    msg2.textContent=''
    msg3.textContent=''
    fetch(`/weather?address=${search.value}`)
    .then((response) =>{
    //console.log(response)
    response.json()
   .then((data) =>{
       if(data.error){
           msg1.textContent=data.error
           msg2.textContent=''
       } else{
           msg1.textContent = `you seached for location ${data.location} which is in timeZone ${data.timezone}`
           msg2.textContent= `The Tempreature here is ${data.temp}. The chance of rain is ${data.rainPercentage}The weather here is ${data.weathersummary}`
           msg3.textContent=  `The max tempreature here today is ${data.highTemp} and the min temp today is ${data.lowTemp}`
           console.log(data)
       }
   }) 
   .catch((error) =>{
    console.log(error)
    msg1.textContent = 'please search for some valid location'
    msg2.textContent=''
}) 
})
.catch((error) =>{
    console.log(error)
})

})





