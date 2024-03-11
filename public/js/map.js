mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map",
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/mapbox/streets-v12",
  center: listing.geometry.coordinates,
  zoom: 8,
});

const marker = new mapboxgl.Marker()
        .setLngLat(listing.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset:25})
        .setHTML(`<h4>${listing.location} </h4><p>Exact location will be provided after the booking</p>`)
)
        .addTo(map);

