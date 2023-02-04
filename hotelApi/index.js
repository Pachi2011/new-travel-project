const getCountryInfo = countryName => {
    axios
      .get(`https://restcountries.com/v2/name/${countryName}`)
      .then(response => {
        console.log('Response from API is: ', response);
        const countryDetail = response.data[0];
        console.log('a single country details: ', countryDetail);
      })
      .catch(err => console.log(err));
  };
   
  document.getElementById('get-country-btn').addEventListener('click', () => {
    const userInput = document.getElementById('country-name-input').value;
    getCountryInfo(userInput);
  });