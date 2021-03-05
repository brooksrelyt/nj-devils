const filters = document.querySelectorAll('.filter');

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    let selectedFilter = filter.getAttribute('data-filter');
    let itemsToHide = document.querySelectorAll(
      `.filter-container .filtr-item:not([data-filter='${selectedFilter}'])`
    );
    let itemsToShow = document.querySelectorAll(
      `.filter-container [data-filter='${selectedFilter}']`
    );

    if (selectedFilter == 'all') {
      itemsToHide = [];
      itemsToShow = document.querySelectorAll(
        '.filter-container [data-filter]'
      );
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
