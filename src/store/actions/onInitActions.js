import axios from 'axios';
import {
    FETCH_ONINIT_REQUEST,
    FETCH_ONINIT_SUCCESS,
    FETCH_ONINIT_FAILURE
} from "../constants/onInitTypes";

const fetchOnInitRequest = () => {
    return {
        type: FETCH_ONINIT_REQUEST
    }
}

const fetchOnInitSuccess = city => {
    return {
        type: FETCH_ONINIT_SUCCESS,
        payload: city
    }
}


const fetchOnInitFailure = error => {
    return {
        type: FETCH_ONINIT_FAILURE,
        payload: error
    }
}

// action creator, return function not object, not pure function ,async api calls
export const fetchOnInit = () => {
    return (dispatch) => {
        dispatch(fetchOnInitRequest);
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + "," + position.coords.longitude + "&sensor=false" + "&key=" + "AIzaSyB8BTZiI8mQlbxR68KJnPWP3RQEuHvdJDM", {
                }).then(function(res){
                    if(res.data.status === "OK"){
                        let address = res.data.results[0].address_components;
                        let filter = address.filter(res=>{
                                if(res.types.includes('locality','political')){
                                    return res;
                                }
                        });
                        let city = {city: filter[0].long_name};
                        dispatch(fetchOnInitSuccess(city))
                    }
                    else{
                        if(res.data.status === "OVER_QUERY_LIMIT")  {
                            return
                        }
                    }
                })
                .catch(error => {
                    const errorMsg = error.message;
                    dispatch(fetchOnInitFailure(errorMsg));
                })
            }, function(error){
                console.log(error)
            }, {maximumAge:60000, timeout:5000, enableHighAccuracy:true})
        }
        // axios.get('http://cms.gesundheitsticket.de/categories')
        //     .then(response => {
        //         const categories = response.data;
        //         dispatch(fetchOnInitSuccess(categories))
        //     })
        //     .catch(error => {
        //         const errorMsg = error.message;
        //         dispatch(fetchOnInitFailure(errorMsg));
        //     })
    }
}