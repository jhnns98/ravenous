const client_id = 'aagDUQpE_NwKUiwih_d5PQ';
const api_key = 'SWL4l-wFGuI_og8-uAlMINHzIjh7JlMIaIh0MonQW9XPDARirASMuJPoSE3uI6C1aKagAucqCMfg432VPitFO10RRVCT_pp6y4K5R816tNBtZQ2lG5Uz_xkHVNTTXHYx';

// Since fetch() is a browser API, older browsers may not support it. To increase the accessibilty of Ravenous to a wider audience of users, we’ll need to add a fetch() polyfill to support older browsers.
// Within the Ravenous directory in your terminal, run npm install whatwg-fetch --save to install the whatwg-fetch polyfill and add it to your package.json file.
// Your fetch() will currently not function correctly due to CORS restrictions.
// We can bypass this restriction with an API called CORS Anywhere. CORS Anywhere will take requests sent to its API endpoint, make them for the requesting app with the proper CORS permissions, and then return the response back to the requesting app.
// prepend the url with https://cors-anywhere.herokuapp.com/

let Yelp = {
  search(term, location, sortBy) {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
      headers: {
        Authorization: `Bearer ${api_key}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.businesses) {
        return jsonResponse.businesses.map(business => ({
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories[0].title,
            rating: business.rating,
            reviewCount: business.review_count
        }));
      }
    });
  }
};

export default Yelp;
