var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';


const DEBOUNCE_DELAY = 300;

const inputF = document.querySelector('#search-box');
const cnList = document.querySelector('.country-list');
const countryCard = document.querySelector('.country-info');

inputF.addEventListener('input', debounce(clSub, DEBOUNCE_DELAY));

function clSub(e) {
  e.preventDefault();
  const trimF = e.target.value.trim();
  if (!trimF) {
    return;
  }
  fetchCountries(trimF)
    .then(funCheck)
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function funCheck(countries) {
  if (countries.length > 10) {
    cnList.innerHTML = '';
    countryCard.innerHTML = '';
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (countries.length > 2 && countries.length < 10) {
    renderCountriesList(countries);
    countryCard.innerHTML = '';
  }
  if (countries.length === 1) {
    cnList.innerHTML = '';
    renderCountries(countries);
  }
}
function renderCountriesList(countries) {
  const markupList = countries
    .map(country => {
      return `<li class="list-item">
         <span>
          <img width="90px" height="45px"  src="${country.flags.svg}">
          </span> ${country.name.official}
          </li>`;
    })
    .join('');
  cnList.innerHTML = markupList;
}

function renderCountries(countries) {
  const countriesInfo = countries
    .map(country => {
      return `<div class=country-wrapper>
      <h2>
      <span class="head-span">
        <img width="90px" height="45px" src="${country.flags.svg}">
      </span> ${country.name.official}
      </h2>
      <ul>
      <li class="country_data"> <span class="country_data--title">Capital: </span> ${
        country.capital
      }</li>
      <li class="country_data"> <span class="country_data--title">Population: </span> ${
        country.population
      } </li>
      <li class="country_data"> <span class="country_data--title">Languages: </span> ${Object.values(
        country.languages
      )}</li>
      </ul>
      </div>
    `;
    })
    .join('');
  countryCard.innerHTML = countriesInfo;
}
