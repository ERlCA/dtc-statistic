const displayData = (items) => {
  contents.innerHTML = '';
  contents.className = "contents";
  contentsDiv.className = 'contents-div';

  thirdOption.className = 'third-option';
  thirdOption.innerHTML = `
      <div>
        <input id='default' type='radio' name='third-option' value='default' checked/>
        <label for='default'>Default</label>
      </div>
      <div>
        <input id='ascendant' type='radio' name='third-option' value='Ascendant'/>
        <label for='ascendant'>Ascendant</label>
      </div>
      <div>
        <input id='descendant' type='radio' name='third-option' value='Descedant'/>
        <label for='descendant'>Descedant</label>
      </div>
    `;
  contents.appendChild(thirdOption);

  items.forEach((item) => {
    const contentWrapper = document.createElement('div');

    //Using escapeHtml function to avoid XSS
    const sanitizedRegion = escapeHTML(item.region);
    const sanitizedCountry = escapeHTML(item.country);
    const sanitizedItemType = escapeHTML(item.item_type);
    const sanitizedSalesChannel = escapeHTML(item.sales_channel);
    const sanitizedPrice = escapeHTML(item.unit_price);
    const sanitizedUnitsSold = escapeHTML(item.units_sold);
    const sanitizedUnitCost = escapeHTML(item.unit_cost);
    const sanitizedId = escapeHTML(item.order_id);

    contentWrapper.innerHTML = `
      <h2>${sanitizedRegion}</h2>
      <h3>${sanitizedCountry}</h3>
      <h4>${sanitizedId}</h4>
      <p>Item type : ${sanitizedItemType}</p>
      <p>Sales channel : ${sanitizedSalesChannel}</p>
      <p>Units sold : ${sanitizedPrice}</p>
      <p>Unit price : ${sanitizedUnitsSold}</p>
      <p>Unit cost : ${sanitizedUnitCost}</p>
    `;

    contentWrapper.className = 'content-wrapper';
    contentsDiv.appendChild(contentWrapper);
  });
  contents.appendChild(contentsDiv);
  container.appendChild(contents);
};

const secondOptionGenerator = () => {
  const inputList = document.querySelectorAll('input[name="main-option"]');

  contents.innerHTML = '';

  inputList.forEach(radio => {
    radio.addEventListener('change', (e) => {
      // if (e.target.value === 'region' || e.target.value === 'country' || e.target.value === 'item_type' || e.target.value === 'sales_channel')
      //   displaySecondOption(e.target.value);
      // else secondOption.innerHTML = '';
      switch (e.target.value) {
        case 'country':
        case 'region':
        case 'item_type':
        case 'sales_channel':
          displaySecondOption(e.target.value);
          break;

        default:
          secondOption.innerHTML = '';
      };
    });
  });
};

const displaySecondOption = (name) => {
  secondOption.innerHTML = '';
  let id = name.replace('_', '-');
  const newArray = Array.from(new Set(datas.map(item => item[name])));
  newArray.sort((a, b) => typeof a === 'string' ? a.localeCompare(b) : a - b);
  newArray.forEach(item => {
    const div = document.createElement('div');
    div.innerHTML = `
      <input type="radio" id=${id} name=${name} />
      <label for=${id}>${item}</label>
    `;

    secondOption.appendChild(div);
  });
  secondOption.className = 'secondary-option';
  sortingContainer.appendChild(secondOption);
};

const displaySortingOption = () => {
  sortingList.forEach(element => {
    const div = document.createElement('div');
    const inputTag = document.createElement('input');
    const labelTag = document.createElement('label');
    let id = element
      .toLowerCase()
      .replaceAll('_', '-');
    let label = element
      .toLowerCase()
      .replaceAll('_', ' ');

    div.className = 'main-option-container';
    inputTag.id = id;
    inputTag.setAttribute('type', 'radio');
    inputTag.setAttribute('name', 'main-option');
    inputTag.value = element;
    labelTag.textContent = label;
    labelTag.setAttribute('for', id);

    //   div.innerHTML = `
    //   <input type="radio" id=${id} name="main-option" value=${element} />
    //   <label for=${id}>${label}</label>
    // `;

    if (inputTag.value === 'all')
      inputTag.checked = true;
    div.appendChild(inputTag);
    div.appendChild(labelTag);
    mainOption.appendChild(div);
  });

  sortingContainer.className = "sorting-option";
  mainOption.className = "main-option";
  sortingContainer.appendChild(mainOption);
  container.appendChild(sortingContainer);

};
//-------------------------------------------------

//-----------xx Testing Code xx----------------
