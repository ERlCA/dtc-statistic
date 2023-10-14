const fetchData = () =>
  fetch(URL)
    .then(res => {
      if (!res.ok)
        throw new Error("An error occured.");
      return res.json();
    })
    .catch(e => {
      "An error occured : ", e.message
      throw e;
    });

const escapeHTML = (html) => {
  return document.createElement('div')
    .appendChild(document.createTextNode(html))
    .parentNode
    .innerHTML;
};

//------------------------------------------------

//------------xx Testing codes xx----------------

fetchData(URL)
  .then(data => {
    data.sales_100.forEach(element => {
      datas.push(element);
    });
    getIndexes(datas);
    displaySortingOption();
    secondOptionGenerator();
    return datas;
  })
  .then(datas => {
    displayData(datas);
  })
  .catch(e => console.log(e));
