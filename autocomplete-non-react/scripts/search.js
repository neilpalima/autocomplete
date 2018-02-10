const source = _.times(100, () => ({
  title: faker.company.companyName(),
  image: faker.internet.avatar(),
}));

let previousSearches = [];

const find = () => {
  const searchInput = document.getElementById('search').value;
  const previousSearch = previousSearches && previousSearches.filter(({ input }) => input === searchInput)[0];

  if (searchInput === '') {
    toggleResultsDisplay();
  }
  else if (previousSearch) {
    updateResults(previousSearch.results);
    toggleResultsDisplay(true);
  } else {
    setTimeout(function() {
      const re = new RegExp(_.escapeRegExp(searchInput), 'i');
      const isMatch = result => re.test(result.title);
      const results = _.filter(source, isMatch).slice(0, 5);

      addToPreviousSearches(searchInput, results);
      updateResults(results);
      toggleResultsDisplay(true);
    }, 100)
  }
}

const addToPreviousSearches = (input, results) => {
  previousSearches = [
    ...previousSearches,
    {
      input,
      results,
    },
  ]
}

const clickResult = (value) => {
  if (value) document.getElementById('search').value = value;
  document.getElementById("results").style.display = 'none';
}

const toggleResultsDisplay = (show) => {
  document.getElementById("results").style.display = show ? 'block' : 'none';
}

const updateResults = (results) => {

  const clearResultsNode = (parent) => {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };

  const createResultChild = (title, image) => {
    const childDiv = document.createElement("div");
    const titleDiv = document.createElement("div");
    const contentDiv = document.createElement("div");
    contentDiv.className = 'content';
    titleDiv.className = 'title';
    childDiv.className = 'result';
    childDiv.onclick = function() { clickResult(title) };
    titleDiv.appendChild(document.createTextNode(title || 'No results found.'));
    contentDiv.appendChild(titleDiv);

    if (!title) childDiv.style.cursor = 'auto';
    if (image) {
      const imageDiv = document.createElement("div");
      const img = document.createElement("img");
      imageDiv.className = "image";
      img.src = image;
      imageDiv.appendChild(img);
      childDiv.appendChild(imageDiv);
    }

    childDiv.appendChild(contentDiv);

    return childDiv;
  }

  const resultsDiv = document.getElementById('results');

  clearResultsNode(resultsDiv);
  if (results && results.length > 0) {
    results.forEach(({ title, image }) => {
      resultsDiv.appendChild(createResultChild(title, image));
    });
  } else {
    resultsDiv.appendChild(createResultChild());
  }
  
}
