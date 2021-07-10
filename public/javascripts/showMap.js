
mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhc2h3YXRpIiwiYSI6ImNrbzA2Z2FiNzA4eG8ydm56cmNsbmxrYXEifQ.PvbKCto1hqg87_R6w4suQw';
const camp = JSON.parse(campground);
const map = new mapboxgl.Map({
    container: 'show-map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: camp.geometry.coordinates, // starting position [lng, lat]
    zoom: 5 // starting zoom
});
map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
    .setLngLat(camp.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h5>${camp.title}</h5>`
            )
    )
    .addTo(map);
