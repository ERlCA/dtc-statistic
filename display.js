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

  thirdOption.className = 'third-option';
  thirdOption.innerHTML = '';

  mainOption.querySelectorAll('input[name="main-option"]')
    .forEach(input => {
      input.addEventListener('change', e => {
        if (e.target.value === 'all' && e.target.checked)
          thirdOption.innerHTML = '';
        else if (e.target.value !== 'all' && e.target.checked)
          thirdOption.innerHTML = `
            <div>
              <input id='ascendent' type='radio' name='third-option' value='Ascendent' checked/>
              <label for='ascendent'>Ascendent</label>
            </div>
            <div>
              <input id='descendent' type='radio' name='third-option' value='Descendent'/>
              <label for='descendent'>Descendent</label>
            </div>
          `
        switch (e.target.value) {
          case 'country':
          case 'region':
          case 'item_type':
          case 'sales_channel':
            console.log('test');
            const chartBtn = document.createElement('a');
            chartBtn.className = 'btn-chart';
            chartBtn.textContent = 'Chart';
            chartBtn.setAttribute('href', './chart.html');
            thirdOption.appendChild(chartBtn);
            break;
        }
      });
    });



  contents.appendChild(thirdOption);

  btnResult.className = 'btn-result';
  btnResult.textContent = 'Show results';

  contents.className = "contents";
  contents.appendChild(btnResult);
  container.appendChild(contents);
};

const displayData = (items) => {
  contentsDiv.innerHTML = '';
  contentsDiv.className = 'contents-div';

  if (items === undefined || items.length < 1)
    return;
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
      <p>Unit price : ${sanitizedPrice}</p>
      <p>Units sold : ${sanitizedUnitsSold}</p>
      <p>Unit cost : ${sanitizedUnitCost}</p>
    `;

    contentWrapper.className = 'content-wrapper';
    contentsDiv.appendChild(contentWrapper);
  });
  contents.appendChild(contentsDiv);
};

const secondOptionGenerator = () => {
  const inputList = document.querySelectorAll('input[name="main-option"]');

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

          secondRadioInput = document.querySelectorAll('input[name="input-second-option"]');
          secondRadioInput.forEach(radio => {
            radio.addEventListener('change', e => {
              if (e.target.value !== 'all')
                thirdOption.innerHTML = '';
              else thirdOption.innerHTML = `
          <div>
            <input id='ascendent' type='radio' name='third-option' value='Ascendent' checked/>
            <label for='ascendent'>Ascendent</label>
          </div>
          <div>
            <input id='descendent' type='radio' name='third-option' value='Descendent'/>
            <label for='descendent'>Descendent</label>
          </div>
        `;
            });
          });
          break;

        default:
          secondOption.innerHTML = '';
      };
    });
  });
};

const displaySecondOption = (name) => {
  let id = escapeHTML(name).replace('_', '-');
  const newArray = Array.from(new Set(datas.map(item => item[name])));

  secondOption.innerHTML = '';

  newArray.sort((a, b) => typeof a === 'string' ? a.localeCompare(b) : a - b);
  newArray.unshift('All');
  newArray.forEach(item => {
    const div = document.createElement('div');
    const value = escapeHTML(item);
    if (item === 'All') {
      div.innerHTML = `
      <input type="radio" id="all" name='input-second-option' value='all' checked/>
      <label for="all">All</label>

      `;

    } else div.innerHTML = `
      <input type="radio" id=${id} name='input-second-option' value="${value}" />
      <label for=${id}>${item}</label>
    `;

    secondOption.appendChild(div);
  });
  secondOption.className = 'secondary-option';
  sortingContainer.appendChild(secondOption);
};

const createButton = () => {
  const chartBtn = document.createElement('a');
  chartBtn.className = 'btn-chart';
  chartBtn.textContent = 'Chart';
  chartBtn.setAttribute('href', './chart.html');
  contents.appendChild(chartBtn);
};
//-------------------------------------------------

