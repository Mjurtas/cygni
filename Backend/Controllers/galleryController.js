import axios from "axios";

// Gets set of photos that matches the "tags"-param
const getPhotos = async (req,res) => {

// Flickr has disabled searches with current photos.search without "&tags="
// Hence why I'm adding a parameterless search if no tags are provided.

await axios.get(`${process.env.BASE_URL
}/&${req.params.tags}&${req.params.page}
&api_key=${process.env.API_KEY}`)
.then(result => {
    if (result.data.stat != "ok") {
        res.status(404).json({error: "Photos couldnt not be fetched."})
    } else {
        const imageUrls = result.data.photos.photo.map(photo => getPhotoUrl(photo))
        res.status(200).send(imageUrls)
    }
})
.catch((err) => {
    console.log(err)
})
};

// Constructs the imageurl before return to client
const getPhotoUrl = (photo) => {
    return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg`
}

export { getPhotos };
