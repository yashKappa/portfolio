document.addEventListener('DOMContentLoaded', function() {
    const userReposUrl = 'https://api.github.com/users/yashKappa/repos';
    const repoDetails = document.getElementById('repo-details');
    const languagesUsed = document.getElementById('languages-used');
    const showMoreBtn = document.getElementById('show-more-btn');
    let allRepos = [];
    let displayedReposCount = 4;

    const languageImages = {
        'HTML': 'https://cdn-icons-png.flaticon.com/256/174/174854.png',
        'CSS': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/CSS3_logo.svg/2048px-CSS3_logo.svg.png',
        'JavaScript': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
        'EJS': 'https://pbs.twimg.com/profile_images/2199543684/ejs_400x400.png',
        // Add more languages and their respective images here
    };

    fetch(userReposUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                repoDetails.innerHTML = '<p>No repositories found.</p>';
                return;
            }

            allRepos = data;
            displayRepos();

            // Extract unique languages used
            const languagesPromises = data.map(repo => fetch(repo.languages_url).then(res => res.json()));
            return Promise.all(languagesPromises);
        })
        .then(languagesData => {
            const uniqueLanguages = new Set();
            languagesData.forEach(languageObj => {
                Object.keys(languageObj).forEach(lang => {
                    if (!['message', 'documentation_url'].includes(lang)) {
                        uniqueLanguages.add(lang);
                    }
                });
            });

            const uniqueLanguagesArray = [...uniqueLanguages];
            const languagesHtml = uniqueLanguagesArray.map(lang => {
                const langImage = languageImages[lang] || 'path/to/default.png'; // Use default image if not found
                return `
                    <div class="language">
                        <img src="${langImage}" alt="${lang}" title="${lang}" class="language-img">
                        <span>${lang}</span>
                    </div>`;
            }).join(' ');

            languagesUsed.innerHTML = `Languages Used: ${languagesHtml}`;
        })
        .catch(error => {
            console.error('Error fetching the repository data:', error);
            repoDetails.innerHTML = `<p>Failed to load repository details: ${error.message}</p>`;
        });

    function displayRepos() {
        const reposToDisplay = allRepos.slice(0, displayedReposCount);
        const repoList = reposToDisplay.map(repo => {
            const homepage = repo.homepage ? `<a href="${repo.homepage}" target="_blank">${repo.homepage}</a>` : 'No homepage available';
            const screenshot = repo.homepage ? `<img src="https://s.wordpress.com/mshots/v1/${encodeURIComponent(repo.homepage)}?w=250" alt="Homepage screenshot">` : '';

            return `
                <div class="repo">
                    <h3>${repo.name}</h3>
                    ${screenshot}
                    <p>Visit site: ${homepage}</p>
                    <p>Description: ${repo.description ? repo.description : 'No description provided.'}</p>
                    <p><a href="${repo.html_url}" target="_blank">View Repository</a></p>
                    <p>Stars: ${repo.stargazers_count}</p>
                    <p>Forks: ${repo.forks_count}</p>
                </div>
            `;
        }).join('');

        repoDetails.innerHTML = repoList;

        // Hide the "Show More" button if all repos are displayed
        if (displayedReposCount >= allRepos.length) {
            showMoreBtn.style.display = 'none';
        }
    }

    showMoreBtn.addEventListener('click', function() {
        displayedReposCount += 4;
        displayRepos();
    });
});
