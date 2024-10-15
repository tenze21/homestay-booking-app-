
let currentLocation;

function success(position){
    let {coords}=position;
    // perform reverse geocode
    fetch(`https://geocode.maps.co/reverse?lat=${coords.latitude}&lon=${coords.longitude}&api_key=666a968c8194e880102121nxg020d6e`)
    .then(res=>res.json())
    .then(data=>{
        if(data){
            // console.log(data);
            // document.getElementById('location').textContent = `${data.address.county}, ${data.address.city}, ${data.address.country}`;
            currentLocation= data.address.county;
        }else{
            alert("Hmm... we couldn't find you location.");
        }
    })
    .catch(error => {
        // document.getElementById('location').textContent = 'Error retrieving location name';
        alert('Error:', error.message)
        console.error('Error:', error);
    });
};

const options={
    enableHighAccuracy: true,
    timeout: 10000,//wait for five minutes
    maximumAge: 0,// specifies that the browser should return the current position and not a cached position.
};



function error(error){
    console.error(error);
};

navigator.geolocation.getCurrentPosition(success, error, options);

export default currentLocation;