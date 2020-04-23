// document.addEventListener('DOMContentLoaded', () => {

//     console.log('Code here');
  
//   }, false);


// Map your choices to your option value
var lookup = {
  'toyota': ['Selecione o Modelo', 'Corolla', 'Hilux', 'Etios', 'SW4', 'Yaris'],
  'volkswagen': ['Selecione o Modelo', 'Gol', 'Fox', 'Voyage', 'Jetta', 'Saveiro'],
  'fiat': ['Selecione o Modelo', 'Uno', 'Palio', 'Toro', 'Siena', 'Strada'],
  'ford': ['Selecione o Modelo', 'Ka', 'Escort', 'Fusion', 'Edge', 'Ranger'],
  'nissan': ['Selecione o Modelo', 'Versa', 'Kicks', 'Sentra', 'March', 'Frontier'],
  'hyundai': ['Selecione o Modelo', 'Azera', 'Creta', 'HB20', 'Tucson', 'IX35'],
  'chevrolet': ['Selecione o Modelo', 'Corsa', 'Celta', 'Onix', 'Prisma', 'Agile'],
  'honda': ['Selecione o Modelo', 'Civic', 'Fit', 'City', 'Accord', 'Cr-V']
};

// When an option is changed, search the above for matching choices
$('#options').on('change', function() {
  // Set selected option as variable
  var selectValue = $(this).val();

  // Empty the target field
  $('#choices').empty();
  
  // For each chocie in the selected option
  for (i = 0; i < lookup[selectValue].length; i++) {
     // Output choice in the target field
     $('#choices').append("<option value='" + lookup[selectValue][i] + "'>" + lookup[selectValue][i] + "</option>");
  }
});

// When an option is changed, search the above for matching choices
$('#options2').on('change', function() {
  // Set selected option as variable
  var selectValue2 = $(this).val();

  // Empty the target field
  $('#choices2').empty();
  
  // For each chocie in the selected option
  for (i = 0; i < lookup2[selectValue2].length; i++) {
     // Output choice in the target field
     $('#choices2').append("<option value='" + lookup2[selectValue2][i] + "'>" + lookup2[selectValue2][i] + "</option>");
  }
});


// MAPS
onload=initialize();

var geocoder, map;
function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-13.6633819, -69.6391629);
  var options = {
    zoom: 4,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById("map_canvas"), options);
  axios.get('http://localhost:3000/api/')
    .then(response => {
      const cars = response.data;
      cars.forEach(element => {
        let address = element.city + ', ' + element.state;
        codeAddress(address);
      });
      
    })
    .catch(error => console.log(error));
};
function codeAddress(address) {
  geocoder.geocode({ 'address': address }, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      // alert("Geocode unsuccessful");
    }
  });
};

//PHOTO
let getImageSrc = $('.car-thumb-1 img').attr('src');
$('.car-thumb-1').css('background-image', 'url(' + getImageSrc + ')');

//ERROR MESSAGE
window.setTimeout(function() {
  $(".alert").fadeTo(500, 0).slideUp(500, function(){
      $(this).remove(); 
  });
}, 2000);

$('#confirm-delete').on('click', function() {
  // event.preventDefault();
  alertify.confirm('Confirm Title', 'Confirm Message', function(){ 
    $('#confirm-delete').click();
   }, function(){ 
     return false;
   });
})

function checkExtention() {
  let file = document.querySelector('#file-type');
  if ( /\.(jpe?g|png|gif)$/i.test(file.files[0].name) === false ) { 
    alert("Este não é um arquivo válido!"); 
  }
}