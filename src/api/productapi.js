import {API} from '../backend';

export const getProducts= () => {
    return fetch(`${API}/products`)
    .then((response)=>{
        return response.json()
    })
    .catch((err)=>console.log(err));
};
