document.getElementById('loan-form').addEventListener('submit', function(e){

  // Hide results
  
  // Show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 1500);

  e.preventDefault();
});

// Calculate resukt func
function calculateResults(){
// console.log('calculating');

  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principle = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principle*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principle).toFixed(2);
    // Show results
    document.getElementById('results').style.display = 'block';
    // Hide loader
    document.getElementById('loading').style.display = 'none';
  } else{
    showError('Please check your numbers');
  }


}


// Show error function
function showError(error){
  // Hide results
  document.getElementById('results').style.display = 'none';
  // Hide loader
  document.getElementById('loading').style.display = 'none';

  const errorDiv = document.createElement('div');

  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  errorDiv.className = 'alert alert-danger'

  // create text node and append to Div
  errorDiv.appendChild(document.createTextNode(error));

  card.insertBefore(errorDiv, heading);

  // Clear error after 3seconds
  setTimeout(clearError, 3000);
}

// Clear error
function clearError(){
  document.querySelector('.alert').remove();
}