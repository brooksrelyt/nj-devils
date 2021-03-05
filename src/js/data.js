// Google Sheets Fetch
const url =
  'https://sheets.googleapis.com/v4/spreadsheets/1zHyHlCNDpBlsry2vIbgcjqFsGnL6SFLGyG8xilJzSqs/values/Sheet1?key=AIzaSyBsFrkIg74CmNHH1jHUsLX0bvkPUh9m41A';
const display = document.querySelector('#data');

const loader = `<span class="loader med-spaces border-0 col-md-12"><div><div></div><div></div><div></div><div></div></div></span>`;
document.querySelector('#data').innerHTML = loader;

const handleResponse = function (data) {
  return new Promise((resolve, reject) => {
    if (!data || !Array.isArray(data.values)) return null;

    document.querySelector('.loader').style.display = 'none';

    const getHeaders = data.values.splice(0, 1)[0];

    let recognitionArray;

    const formattedData = data.values.map(function (arrValue) {
      const obj = {};
      getHeaders.forEach(function (header, i) {
        const formattedHeader = header.replace(/\s+/g, '_').toLowerCase();
        obj[formattedHeader] = arrValue[i];
      });
      return obj;
    });

    console.log(formattedData);

    if (!Array.isArray(recognitionArray)) recognitionArray = formattedData;

    recognitionArray.forEach(function (obj, i) {
      const [col, item] = [1, 2].map(function () {
        return document.createElement('div');
      });

      const description = document.createElement('p');
      const name = document.createElement('h3');
      const image = document.createElement('img');

      // Image
      image.src = obj.link_to_box_file_picture_of_them;
      image.setAttribute('alt', 'Picture of ' + obj.name);
      image.classList.add('img-fluid');
      col.appendChild(image);

      if (obj.link_to_box_file_picture_of_them == null) {
        image.src = '../img/testudo.jpg';
      }

      // Title
      name.innerHTML = obj.name;
      item.appendChild(name);

      // Description
      description.innerHTML = obj.blurb;
      item.appendChild(description);

      if (obj.blurb == null) {
        description.innerHTML = 'Bio Coming Soon.';
      }

      // Layout
      col.classList.add('filtr-item');
      col.setAttribute('data-filter', obj.level.toLowerCase());
      col.appendChild(item);
      display.appendChild(col);

      if (recognitionArray.length - 1 === i) {
        resolve();
      }
    });

    if (recognitionArray === undefined || recognitionArray.length == 0) {
      const container = document.createElement('div');
      const noResults = document.createElement('p');

      noResults.innerHTML = 'There is currenlty no data available.';
      container.appendChild(noResults);
      display.appendChild(container);
    }
  });
};

// Detect if user is on IE browser
const isIE = !!window.MSInputMethodContext && !!document.documentMode;

if (isIE) {
  var promiseScript = document.createElement('script');
  promiseScript.type = 'text/javascript';
  promiseScript.src =
    'https://cdn.jsdelivr.net/npm/promise-polyfill@8.1.3/dist/polyfill.min.js';

  var fetchScript = document.createElement('script');
  fetchScript.type = 'text/javascript';
  fetchScript.src =
    'https://cdn.jsdelivr.net/npm/whatwg-fetch@3.4.0/dist/fetch.umd.min.js';

  document.head.appendChild(promiseScript);
  document.head.appendChild(fetchScript);
} else {
  fetch(url)
    .then((resp) => resp.json())
    .then(handleResponse)
    .catch(function (error) {
      console.log(error);
    });
}
