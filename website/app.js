// Global Variables

const generate = document.querySelector('#generate');
const zip = document.querySelector('#zip');


// Create a new date instance dynamically with JS
let d = new Date();
let currentDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();


const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apikey = "&appid=db6d37957b7dbb4e5136cf7044483586&units=imperial";

generate.addEventListener('click', (event) => {
    event.preventDefault();

    const madeURL = `${baseURL}${zip.value}${apikey}`;
    // console.log(madeURL);

    getData(madeURL).then((info) => {
        postData('/add', info);
    });

})

// Getting Data from Remote API
const getData = async (url) => {
    
    const result = await fetch(url);
    try{
    const data = await result.json();
    // console.log(data);
    if(data.message){
        console.log(data.message);
        return data;
    }else{
        const info = {
            currentDate,
            feelings: feelings.value,
            temp: data.main.temp
        }
        console.log(info);
        return info;
    }
    }catch(e){
        console.log(e);
    }
}

// posting data to the sever

const postData = async (url="", data={}) => {
    const result = await fetch(url, {
        method: "POST",
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    // console.log(result);
    try{
            const response = await result.json();
            console.log(response);
            return response;
    }catch(e){
        console.log(e);
    }
}