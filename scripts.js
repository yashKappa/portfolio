document.addEventListener('DOMContentLoaded', function() {
    const userReposUrl = 'https://api.github.com/users/yashKappa/repos';
    const repoDetails = document.getElementById('repo-details');
    const languagesUsed = document.getElementById('languages-used');
    const showMoreBtn = document.getElementById('show-more-btn');
    const showLessBtn = document.getElementById('show-less-btn');
    let allRepos = [];
    let displayedReposCount = 4;

    const languageImages = {
        'HTML': 'https://cdn-icons-png.flaticon.com/256/174/174854.png',
        'CSS': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/CSS3_logo.svg/2048px-CSS3_logo.svg.png',
        'JavaScript': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
        'EJS': 'https://pbs.twimg.com/profile_images/2199543684/ejs_400x400.png',
        // Add more languages and their respective images here
    };

    const authHeaders = {
        headers: {
            'Authorization': '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'
        }
    };

    fetch(userReposUrl, authHeaders)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Process data as before
    })
    .catch(error => {
        console.error('Error fetching the repository data:', error);
    });
    
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

            fetch(userReposUrl, authHeaders)
    .then(response => {
        if (response.status === 403 && response.headers.get('X-RateLimit-Remaining') === '0') {
            throw new Error('Rate limit exceeded. Please try again later.');
        }
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error fetching the repository data:', error);
        repoDetails.innerHTML = `<p class="error">Failed to load repository details: ${error.message}</p>`;
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

            languagesUsed.innerHTML = `${languagesHtml}`;
        })
        .catch(error => {
            console.error('Error fetching the repository data:', error);
            repoDetails.innerHTML = `<p class="error">Failed to load repository details: ${error.message}</p>
            <p class="error">Too Many Request At a Time, Open The Page After Some Time</p>`;
        });

    /*function displayRepos() {
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

        // Show or hide the "Show More" and "Show Less" buttons
        showMoreBtn.style.display = (displayedReposCount < allRepos.length) ? 'block' : 'none';
        showLessBtn.style.display = (displayedReposCount > 4) ? 'block' : 'none';
    }*/

        function displayRepos() {
            const reposToDisplay = allRepos.slice(0, displayedReposCount);
            const repoList = reposToDisplay.map(repo => {
                const homepage = repo.homepage 
                    ? `<a href="${repo.homepage}" target="_blank">${repo.homepage}</a>` 
                    : 'No homepage available';
                
                // Styled iframe to look like a laptop screen preview
                const iframe = repo.homepage 
                    ? `<iframe src="${repo.homepage}" ></iframe>`
                    : '<p>No website available for preview.</p>';
        
                return `
                    <div class="repo">
                        <h3>${repo.name}</h3>
                        <div class="laptop-frame">
                            ${iframe}
                        </div>
                        <p>Visit site: ${homepage}</p>
                        <p>Description: ${repo.description ? repo.description : 'No description provided.'}</p>
                        <p><a href="${repo.html_url}" target="_blank">View Repository</a></p>
                        <p>Stars: ${repo.stargazers_count}</p>
                        <p>Forks: ${repo.forks_count}</p>
                    </div>

                `;
            }).join('');
        
            repoDetails.innerHTML = repoList;
        
            // Show or hide the "Show More" and "Show Less" buttons
            showMoreBtn.style.display = (displayedReposCount < allRepos.length) ? 'block' : 'none';
            showLessBtn.style.display = (displayedReposCount > 4) ? 'block' : 'none';
        }
        
        
        

    showMoreBtn.addEventListener('click', function() {
        displayedReposCount += 4;
        displayRepos();
    });

    showLessBtn.addEventListener('click', function() {
        displayedReposCount = 4;
        displayRepos();
        repoDetails.scrollIntoView({ behavior: 'smooth' }); // Scroll the repo-details into view
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const menuItems = navMenu.querySelectorAll('li a'); // Get all menu item links

    menuToggle.addEventListener('click', function(event) {
        navMenu.classList.toggle('show-menu');
        event.stopPropagation(); // Prevent the click event from bubbling up to the document
    });

    // Add a click event listener to the document to close the menu when clicking outside of it
    document.addEventListener('click', function(event) {
        if (navMenu.classList.contains('show-menu') && !navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            navMenu.classList.remove('show-menu');
        }
    });

    // Ensure clicks inside the navMenu don't propagate to the document
    navMenu.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // Add click event listeners to each menu item link to close the menu after clicking
    menuItems.forEach(function(item) {
        item.addEventListener('click', function() {
            navMenu.classList.remove('show-menu');
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const texts = document.querySelectorAll('.p3');
    let index = 0;

    function typeNextText() {
        if (index >= texts.length) {
            index = 0; // Reset index to loop continuously
        }

        const currentText = texts[index];
        const fullText = currentText.getAttribute('data-text');
        currentText.textContent = '';
        currentText.style.display = 'inline-block'; // Show the current text
        let charIndex = 0;

        function typeChar() {
            if (charIndex < fullText.length) {
                currentText.textContent += fullText.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 100); // Adjust typing speed here
            } else {
                setTimeout(() => {
                    currentText.style.display = 'none'; // Hide the current text
                    index++;
                    typeNextText();
                }, 1000); // Adjust delay before hiding text here
            }
        }

        typeChar();
    }

    typeNextText();
});


document.addEventListener('DOMContentLoaded', function() {
    const skillItems = document.querySelectorAll('.skill-item');
    const headingImages = document.querySelectorAll('.heading-image');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
                observer.unobserve(entry.target);
                observer.observe(entry.target);
            }
        });
    }, { threshold: 0.1 });

    skillItems.forEach(skill => {
        observer.observe(skill);
    });

    headingImages.forEach(headingImage => {
        observer.observe(headingImage);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade');

    function fadeInElements() {
        fadeElements.forEach((element, index) => {
            if (isElementInViewport(element) && !element.classList.contains('show')) {
                setTimeout(() => {
                    element.classList.add('show');
                }, index * 10); // Adjust the delay between each element's fade-in effect
            } else if (!isElementInViewport(element) && element.classList.contains('show')) {
                element.classList.remove('show');
            }
        });
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function throttle(callback, limit) {
        let waiting = false;
        return function() {
            if (!waiting) {
                callback.apply(this, arguments);
                waiting = true;
                setTimeout(() => {
                    waiting = false;
                }, limit);
            }
        };
    }

    const throttledFadeIn = throttle(fadeInElements, 100);

    window.addEventListener('scroll', throttledFadeIn);
    window.addEventListener('resize', throttledFadeIn);

    // Initial check when the page loads
    fadeInElements();

    document.getElementById('download-btn').addEventListener('click', function() {
        document.getElementById('popup').classList.add('show');
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.popup-content') && !event.target.matches('#download-btn')) {
            document.getElementById('popup').classList.remove('show');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.image img');
    let currentIndex = 0;

    function showNextImage() {
        images.forEach(img => img.style.display = 'none');
        images[currentIndex].style.display = 'block';
        currentIndex = (currentIndex + 1) % images.length;
    }

    setInterval(showNextImage, 2000); // Change image every 5 seconds
});


// JavaScript to hide loader after the GIF animation completes
window.addEventListener('load', function() {
    // Duration of the GIF in milliseconds (adjust as needed)
    var gifDuration = 5000; // 5 seconds for example

    setTimeout(function() {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
    }, gifDuration);

    // Initially add the loading class to prevent scrolling and hide content
    document.body.classList.add('loading');
});
