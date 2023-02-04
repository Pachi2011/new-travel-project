const getCountryInfo = countryName => {
  axios
    .get(`https://restcountries.com/v2/name/${country}`)
    .then(response => {
      console.log('Response from API is: ', response);
      const countryDetail = response.data.country;
      console.log('a single country details: ', countryDetail);

      res.render('apiTrip');
    })
    .catch(err => console.log(err));
};
 
document.getElementById('get-country-btn').addEventListener('click', () => {
  const userInput = document.getElementById('country-name-input').value;
  getCountryInfo(userInput);
});