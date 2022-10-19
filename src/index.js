// import markup from './tamplate/markup.hbs'
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

import { fetchCountries } from './fetchCountries';
const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');

const controlDiv = document.querySelector('country-info');
input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  console.log(evt.target.value);

  if (evt.target.value.trim() === ``) {
    list.innerHTML = '';
    Notiflix.Notify.info('Enter a symbol');
  } else {
    const countryInput = evt.target.value.trim();
    console.log(countryInput);

    fetchCountries(countryInput)
      .then(countryItem => {
        console.log(countryItem.length);

        if (countryItem.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if ((countryItem.length >= 2) & (countryItem.length <= 10)) {
          const markupList = createMarkupList(countryItem);
          list.innerHTML = '';
          list.insertAdjacentHTML(`beforeend`, markupList);
        } else if (countryItem.length === 1) {
          const markupCountry = createMarkupCountry(countryItem);
          list.innerHTML = '';
          list.insertAdjacentHTML(`beforeend`, markupCountry);
        }
      })
      .catch(error => {
        list.innerHTML = '';
        Notiflix.Notify.failure(error.message);
      });
  }
  function createMarkupCountry(arr) {
    return arr
      .map(
        country =>
          `<li class = "card">
    <div class = "container">
    <img src="${country.flags.png}" alt="flag of ${
            country.name.official
          }" width = 50px  height = 30px>
     <h2>${country.name.official}</h2> </div>
     <p>  <b>Capital: </b> ${country.capital}</p>
     <p> <b>Population: </b>${country.population}</p>
   <p> <b>Languages: </b>${Object.values(country.languages).join(`,`)}</p>
     </li>`
      )
      .join(``);
  }

  function createMarkupList(array) {
    return array
      .map(
        country => `<li class = "card">
            <div class = "container">
            <img src="${country.flags.png}" alt="flag of ${country.name.official}" width = 50px  height = 30px>
            <h2>${country.name.official}</h2>
            </div>
            </li>`
      )
      .join(``);
  }
}
