var getUserRepos = function (user) {
  // format the github api url
  var apiUrl = `https://api.github.com/users/${user}/repos`;

  // Make a request to the url
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        // If response is ok, handle the data
        response.json().then(function (data) {
          displayRepos(data, user);
        });
      } else {
        // If the connection is ok but no data is returned, execute this
        alert('Error: GitHub User Not Found');
      }
    })
    .catch(function (error) {
      // If there is no connection at all, execute this
      alert('Unable to connect to GitHub');
    });
};

function formSubmitHandler(e) {
  e.preventDefault();
  if (nameInputEl.value.trim()) {
    getUserRepos(nameInputEl.value.trim()); //  Get rid of empty spaces
    nameInputEl.value = '';
  } else {
    alert('Please fill in the form');
  }
}

const userFormEl = document.getElementById('user-form');
var nameInputEl = document.getElementById('username');
userFormEl.addEventListener('submit', formSubmitHandler);

var displayRepos = function (repos, searchTerm) {
  // check if api returned any repos
  if (repos.length === 0) {
    repoContainerEl.textContent = 'No repositories found.';
    return;
  }

  // clear old content
  repoContainerEl.textContent = '';
  repoSearchTerm.textContent = searchTerm;

  repos.forEach((item) => {
    // format repo name
    var repoName = item.owner.login + '/' + item.name;

    var repoEl = document.createElement('a');
    repoEl.classList = 'list-item flex-row justify-space-between align-center';
    repoEl.setAttribute('href', './single-repo.html?repo=' + repoName);

    // create a span element to hold repository name
    var titleEl = document.createElement('span');
    titleEl.textContent = `${searchTerm}/${item.name}`;

    // append to container
    repoEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    // check if current repo has issues or not
    if (item.open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" +
        item.open_issues_count +
        ' issue(s)';
    } else {
      statusEl.innerHTML =
        "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    // append to container
    repoEl.appendChild(statusEl);

    // append container to the dom
    repoContainerEl.appendChild(repoEl);
  });
};

var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term');
