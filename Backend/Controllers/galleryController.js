import axios from "axios";

// Gets set of photos that matches the "tags"-param
const getPhotos = async (res,req) => {

await axios.get(`${process.env.BASE_URL}&tags=star_wars&api_key=${process.env.API_KEY}`)
.then(res => console.log(res.data))
.catch((err) => {
    console.log(err)
})
};

export { getPhotos };
