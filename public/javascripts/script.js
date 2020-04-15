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