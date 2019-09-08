console.log('Client side javascript');

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data);
    })
})

fetch('/weather?address=boston').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error);
        }else{
            console.log(data.location);
            console.log(data.forecast);
        }
    })
})


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    const location = search.value;
    fetch(`/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error);
            document.getElementById('error').innerHTML = data.error;
            document.getElementById('location').innerHTML = '';
            document.getElementById('forecast').innerHTML = '';
        }else{
            console.log(data.location);
            console.log(data.forecast);
            document.getElementById('error').innerHTML = '';
            document.getElementById('location').innerHTML = data.location;
            document.getElementById('forecast').innerHTML = data.forecast;
        }
    })
})
})