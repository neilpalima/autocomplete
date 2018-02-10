'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var source = _.times(100, function () {
  return {
    title: faker.company.companyName(),
    image: faker.internet.avatar()
  };
});

var previousSearches = [];

var find = function find() {
  var searchInput = document.getElementById('search').value;
  var previousSearch = previousSearches && previousSearches.filter(function (_ref) {
    var input = _ref.input;
    return input === searchInput;
  })[0];

  if (searchInput === '') {
    toggleResultsDisplay();
  } else if (previousSearch) {
    updateResults(previousSearch.results);
    toggleResultsDisplay(true);
  } else {
    setTimeout(function () {
      var re = new RegExp(_.escapeRegExp(searchInput), 'i');
      var isMatch = function isMatch(result) {
        return re.test(result.title);
      };
      var results = _.filter(source, isMatch).slice(0, 5);

      addToPreviousSearches(searchInput, results);
      updateResults(results);
      toggleResultsDisplay(true);
    }, 100);
  }
};

var addToPreviousSearches = function addToPreviousSearches(input, results) {
  previousSearches = [].concat(_toConsumableArray(previousSearches), [{
    input: input,
    results: results
  }]);
};

var clickResult = function clickResult(value) {
  if (value) document.getElementById('search').value = value;
  document.getElementById("results").style.display = 'none';
};

var toggleResultsDisplay = function toggleResultsDisplay(show) {
  document.getElementById("results").style.display = show ? 'block' : 'none';
};

var updateResults = function updateResults(results) {

  var clearResultsNode = function clearResultsNode(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };

  var createResultChild = function createResultChild(title, image) {
    var childDiv = document.createElement("div");
    var titleDiv = document.createElement("div");
    var contentDiv = document.createElement("div");
    contentDiv.className = 'content';
    titleDiv.className = 'title';
    childDiv.className = 'result';
    childDiv.onclick = function () {
      clickResult(title);
    };
    titleDiv.appendChild(document.createTextNode(title || 'No results found.'));
    contentDiv.appendChild(titleDiv);

    if (!title) childDiv.style.cursor = 'auto';
    if (image) {
      var imageDiv = document.createElement("div");
      var img = document.createElement("img");
      imageDiv.className = "image";
      img.src = image;
      imageDiv.appendChild(img);
      childDiv.appendChild(imageDiv);
    }

    childDiv.appendChild(contentDiv);

    return childDiv;
  };

  var resultsDiv = document.getElementById('results');

  clearResultsNode(resultsDiv);
  if (results && results.length > 0) {
    results.forEach(function (_ref2) {
      var title = _ref2.title,
          image = _ref2.image;

      resultsDiv.appendChild(createResultChild(title, image));
    });
  } else {
    resultsDiv.appendChild(createResultChild());
  }
};