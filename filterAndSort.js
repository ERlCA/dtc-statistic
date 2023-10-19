/* ------------------xx---------------------- */


/* ----------xx Testing codes xx-------------- */
btnResult.addEventListener('click', () => {
  const firstRadioInput = mainOption.querySelectorAll('input[name="main-option"]');
  // let secondRadioInput = '';
  let radioChecked = '';
  const thirdRadioInput = document.querySelectorAll('input[name="third-option"]');

  filteredData.length = 0;
  dataCopy.length = 0;

  datas.forEach(element => {
    dataCopy.push(element);
  })

  firstRadioInput.forEach(radio => {
    if (radio.checked)
      radioChecked = radio.value;
    if (radio.checked && radioChecked === 'all') {
      displayData(dataCopy);
      return;
    }
  });

  thirdRadioInput.forEach(radio => {
    if (radio.checked && radio.value === 'Ascendent')
      dataCopy.sort((a, b) => typeof a[radioChecked] === 'string' ? a[radioChecked].localeCompare(b[radioChecked]) : a[radioChecked] - b[radioChecked]);

    else if (radio.checked && radio.value === 'Descendent')
      dataCopy.sort((a, b) => typeof a[radioChecked] === 'string' ? b[radioChecked].localeCompare(a[radioChecked]) : b[radioChecked] - a[radioChecked]);
  });

  if (radioChecked === 'region' || radioChecked === 'country' || radioChecked === 'item_type' || radioChecked === 'sales_channel') {
    // secondRadioInput = document.querySelectorAll('input[name="input-second-option"]');
    secondRadioInput.forEach(radio => {
      radio.addEventListener('change', e => {
        if (e.target.value !== 'all')
          thirdOption.innerHTML = '';
        console.log(e.target.value);
      });
      if (radio.checked && radio.value !== 'all') {
        dataCopy
          .filter(item => item[radioChecked] == radio.value)
          .forEach(element => filteredData.push(element));
        displayData(filteredData);
      }
      if (radio.checked && radio.value === 'all')
        displayData(dataCopy);

    });
  } else displayData(dataCopy);



  // displayData(filteredData);
});