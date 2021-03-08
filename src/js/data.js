// Google Sheets Fetch
const url =
  'https://sheets.googleapis.com/v4/spreadsheets/1LL89l_LEOz-LrY2LnrDq6PwZ8LbIidBAWDBMdFPtixE/values/Sheet1?key=AIzaSyBsFrkIg74CmNHH1jHUsLX0bvkPUh9m41A';
const display = document.querySelector('#data');

const loader = `<span class="loader med-spaces border-0 col-md-12"><div><div></div><div></div><div></div><div></div></div></span>`;
document.querySelector('#data').innerHTML = loader;

const handleResponse = function (data) {
  return new Promise((resolve, reject) => {
    if (!data || !Array.isArray(data.values)) return null;

    document.querySelector('.loader').style.display = 'none';

    const getHeaders = data.values.splice(0, 1)[0];

    let devilsArray;

    const formattedData = data.values.map(function (arrValue) {
      const obj = {};
      getHeaders.forEach(function (header, i) {
        const formattedHeader = header.replace(/\s+/g, '_').toLowerCase();
        obj[formattedHeader] = arrValue[i];
      });
      return obj;
    });

    console.log(formattedData);

    if (!Array.isArray(devilsArray)) devilsArray = formattedData;

    devilsArray.forEach(function (obj, i) {
      const [col, item] = [1, 2].map(function () {
        return document.createElement('div');
      });

      const player = document.createElement('h2');
      const list = document.createElement('ul');
      const [gp, points, goals, assists] = [1, 2, 3, 4].map(function () {
        return document.createElement('li');
      });

      // Player Name
      player.innerHTML = obj.player;
      player.classList.add('medium-san-serif');
      item.appendChild(player);

      gp.innerHTML = '<span>Games Played:</span> ' + obj.gp;
      list.appendChild(gp);
      item.appendChild(list);

      goals.innerHTML = '<span>Goals:</span> ' + obj.g;
      list.appendChild(goals);
      item.appendChild(list);

      assists.innerHTML = '<span>Assists:</span> ' + obj.a;
      list.appendChild(assists);
      item.appendChild(list);

      points.innerHTML = '<span>Total Points:</span> ' + obj.pts;
      list.appendChild(points);
      item.appendChild(list);

      // Layout
      col.setAttribute('data-filter', obj.hof);
      col.appendChild(item);
      display.appendChild(col);

      if (devilsArray.length - 1 === i) {
        resolve();
      }
    });

    if (devilsArray === undefined || devilsArray.length == 0) {
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
