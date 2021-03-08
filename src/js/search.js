// Filter
const filters = document.querySelectorAll('.filter');

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    let selectedFilter = filter.getAttribute('data-filter');
    let itemsToHide = document.querySelectorAll(
      `#data > div:not([data-filter='${selectedFilter}'])`
    );
    let itemsToShow = document.querySelectorAll(
      `#data [data-filter='${selectedFilter}']`
    );

    if (selectedFilter == 'all') {
      itemsToHide = [];
      itemsToShow = document.querySelectorAll('#data [data-filter]');
    }

    itemsToHide.forEach((el) => {
      el.classList.add('hide');
      el.classList.remove('show');
    });

    itemsToShow.forEach((el) => {
      el.classList.remove('hide');
      el.classList.add('show');
    });
  });
});

//search
function filter(searchResults) {
  search = searchResults.value.toLowerCase();

  console.log(searchResults.value);

  document.querySelectorAll('#data [data-filter]').forEach(function (el) {
    text = el.innerText.toLowerCase();
    if (text.match(search)) {
      el.classList.remove('hide');
      el.classList.add('show');
    } else {
      el.classList.add('hide');
      el.classList.remove('show');
    }
  });
}
