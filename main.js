const fetchData = () =>
  fetch(URL)
    .then(res => {
      if (!res.ok)
        throw new Error("An error occured.");
      return res.json();
    })
    .catch(e => {
      Error("An error occured : ", e.message)
    });

const escapeHTML = (html) => {
  return document.createElement('div')
    .appendChild(document.createTextNode(html))
    .parentNode
    .innerHTML;
};

//------------------------------------------------

fetchData(URL)
  .then(data => {
    data.sales_100.forEach(element => {
      datas.push(element);
    });
    getIndexes(datas);
    displaySortingOption();
    secondOptionGenerator();

    displayData(datas);
  })
  .catch(e => console.log(e));
