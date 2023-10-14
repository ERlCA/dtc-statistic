const container = document.querySelector('.container');
const contentsDiv = document.createElement('contents-div');
const sortingContainer = document.createElement('div');
const mainOption = document.createElement('form');
const secondOption = document.createElement('form');
const thirdOption = document.createElement('form');
const contents = document.createElement('div');
const sortingList = ['all'];
const URL = "./sales_100.json";
const datas = [];
const filteredData = [];

/*------------xxxxxxxxxxxxxxxx--------------*/



const getIndexes = (data) => {
  for (const index in data[0]) {
    sortingList.push(escapeHTML(index.trim()));
  }
};

//-------------xx Testing codes xx--------------

