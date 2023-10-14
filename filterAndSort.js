const filter = () => {
  const inputContainer = document.querySelector('.main-option');

  inputContainer.addEventListener('change', (event) => {
    if (event.target.type === 'radio') {
      let value = event.target.value;

      datas.forEach(element => {
        filteredData.push(element);
      });

      switch (value) {
        case 'region':
          filteredData.sort((a, b) => a.region.localeCompare(b.region));
          displayData(filteredData);
          console.log(filteredData);
          break;

        default:
          datas.forEach(element => {
            filteredData.push(element);
            displayData(filteredData);
          });
      }
    }
  });
};

const sort = () => {

}