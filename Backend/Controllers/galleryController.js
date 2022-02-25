import axios from "axios";

// Gets set of photos that matches the "tags"-param
const getPhotos = async (req, res) => {
  await axios
    .get(`${process.env.BASE_URL}`, {
      params: { ...req.params, api_key: process.env.API_KEY },
    })
    .then((result) => {
      if (result.statusText != "OK") {
        throw new Error("Something went wrong fetching from 3rd party API.");
      } else {
        const imageUrls = result.data.photos.photo.map((photo) =>
          getPhotoUrl(photo)
        );
        return res.status(result.status).send(imageUrls);
      }
    })

    // https://axios-http.com/docs/handling_errors
    .catch((error) => {
      if (error.response) {
        return res.status(error.response.status || 400).json({message: "Failed due to response issues."});;
      } else if (error.request) {
        return res.status(error.request.status || 400).json({message: "Failed due to request issues."});;
      } else {
        return res.status(404).json({message: error.message});
      }
    });
};

// Constructs the imageurl before return to client
const getPhotoUrl = (photo) => {
  return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg`;
};

export { getPhotos };
