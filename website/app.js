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
        postData('/add', info).then((data) => {
            fetchData('/fetch').then((data) => {
                updateUI(data);
            });
        });
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
        // console.log(info);
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
            // console.log(response);
            return response;
    }catch(e){
        console.log(e);
    }
}

// fetching data back from Server

const fetchData = async (url) => {
    const data = await fetch(url);
    try{
        const response = await data.json();
        // console.log(response);
        return response;
    }catch(e){
        console.error(e);
    }
}

// updating UI
const updateUI = async (data) => {
    const response = await data;
    console.log(response);

    if(response.currentDate){

        document.querySelector('.holder.entry').style.display = 'block';
        document.querySelector('#date').innerHTML = `Date: ${response.currentDate}`;
        document.querySelector('#temp').innerHTML = `Temperature: ${response.temp}`;
        document.querySelector('#content').innerHTML = `Feelings: ${response.feelings}`;
        document.querySelector('#error').style.display = 'none';
        
    }else{

        document.querySelector('.holder.entry').style.display = 'none';
        document.querySelector('#error').style.display = 'block';
        document.querySelector('#error').innerHTML = `Error: ${response.message}`;
    }


}