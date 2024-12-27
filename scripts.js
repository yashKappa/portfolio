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
        'Python': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python',
        'TypeScript': 'https://cdn.worldvectorlogo.com/logos/typescript-2.svg',
        'C++': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png',
        'Dart': 'https://cdn.iconscout.com/icon/free/png-256/free-flutter-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-3-pack-logos-icons-2944876.png?f=webp&w=256',
        'CMake': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/CMake-logo-triangle-high-res.png/1200px-CMake-logo-triangle-high-res.png',
        'C': 'https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png',
        'Swift': 'https://developer.apple.com/swift/images/swift-og.png',
        'Kotlin': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Kotlin_Icon.png/1200px-Kotlin_Icon.png',
        'Objective-C': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6uNin_p1OOe9DFjHY-jcd7SoMhWc-qv_-Yw&s',
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

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async function fetchLanguagesWithDelay(repos) {
        const languagesData = [];
        for (const repo of repos) {
            const res = await fetch(repo.languages_url);
            if (res.ok) {
                languagesData.push(await res.json());
            }
            await delay(500); // Delay of 500ms between requests
        }
        return languagesData;
    }

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

        async function fetchLanguages(repo) {
            try {
                const response = await fetch(repo.languages_url, authHeaders);
                if (response.ok) {
                    const languages = await response.json();
                    return Object.keys(languages); // Return only the language names
                } else {
                    console.error(`Failed to fetch languages for ${repo.name}: ${response.status}`);
                }
            } catch (error) {
                console.error(`Error fetching languages for ${repo.name}:`, error);
            }
            return []; // Return an empty array on failure
        }
        
        async function fetchReposWithLanguages() {
            const response = await fetch(userReposUrl, authHeaders);
            if (!response.ok) {
                throw new Error(`Failed to fetch repositories: ${response.status}`);
            }
            const repos = await response.json();
    
            for (const repo of repos) {
                const languages = await fetchLanguages(repo);
                repo.languages = languages.join(', '); // Store languages as a string in the repo object
            }
            return repos;
        }
    
        function displayRepos() {
            const reposToDisplay = allRepos.slice(0, displayedReposCount);
            const repoList = reposToDisplay.map(repo => {
                const homepage = repo.homepage 
                    ? `<a href="${repo.homepage}" target="_blank">${repo.homepage}</a>` 
                    : 'No homepage available';
                
                const iframe = repo.homepage 
                    ? `<iframe src="${repo.homepage}" ></iframe>`
                    : '<p>No website available for preview.</p>';
    
                const languages = repo.languages || 'Languages not available';
    
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
                        <p>Languages: ${languages}</p>
                    </div>
                `;
            }).join('');
    
            repoDetails.innerHTML = repoList;
    
            // Show or hide the "Show More" and "Show Less" buttons
            showMoreBtn.style.display = (displayedReposCount < allRepos.length) ? 'block' : 'none';
            showLessBtn.style.display = (displayedReposCount > 4) ? 'block' : 'none';
        }
        
        // Call this function to fetch repositories with language data and display them
        fetchReposWithLanguages().then(repos => {
            allRepos = repos;
            displayRepos();
        }).catch(error => {
            console.error('Error fetching repositories or languages:', error);
            repoDetails.innerHTML = `<p class="error">Failed to load repository details: ${error.message}</p>
            <p class="error">Too Many Requests. Please try again later.</p>`;
        });
        
        
        
        

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

const mainCursor = document.getElementById("cursor-main");
const shadowCursor = document.getElementById("cursor-shadow");

document.addEventListener("mousemove", (e) => {
    // Only show custom cursor on desktop, hide on mobile
    if (window.innerWidth > 768) {
        mainCursor.style.left = `${e.clientX}px`;
        mainCursor.style.top = `${e.clientY}px`;

        // Slightly delay the shadow cursor to create a trailing effect
        setTimeout(() => {
            shadowCursor.style.left = `${e.clientX}px`;
            shadowCursor.style.top = `${e.clientY}px`;
        }, 50); // Adjust delay for shadow effect
    }
});

// Hover effect to increase main cursor size, change color, and shrink shadow cursor
document.querySelectorAll('button, a').forEach(item => {
    item.addEventListener('mouseenter', () => {
        // Increase main cursor size and change its color to red with border
        mainCursor.style.width = '25px';
        mainCursor.style.height = '25px';
        mainCursor.style.border = '3px solid red'; /* Red border */
        mainCursor.style.backgroundColor = 'rgba(255, 0, 0, 0)'; // Red color for main cursor
        
        // Shrink shadow cursor and change its color to yellow with background color
        shadowCursor.style.width = '5px';
        shadowCursor.style.height = '5px';
        shadowCursor.style.backgroundColor = 'Yellow'; // Yellow for shadow cursor
    });

    item.addEventListener('mouseleave', () => {
        // Reset main cursor size and color
        mainCursor.style.width = '10px';
        mainCursor.style.height = '10px';
        mainCursor.style.border = 'none';
        mainCursor.style.backgroundColor = 'rgb(255, 0, 0)'; // Reset to red
        
        // Reset shadow cursor size, border, and background color
        shadowCursor.style.width = '25px';
        shadowCursor.style.height = '25px';
        shadowCursor.style.border = '2px solid yellow';
        shadowCursor.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'; // Reset shadow color
    });
});


window.onload = function() {
  const container = document.querySelector('.container');
  const svg = document.querySelector('svg');
  const progressBar = document.querySelector('.progress-bar');
  const pct = document.querySelector('.pct');
  const totalLength = progressBar.getTotalLength();
    
  setTopValue(svg);
  
  progressBar.style.strokeDasharray = totalLength;
  progressBar.style.strokeDashoffset = totalLength;
  
  window.addEventListener('scroll', () => {
    setProgress(container, pct, progressBar, totalLength);
  });
  
  window.addEventListener('resize', () => {
    setTopValue(svg);
  });
}

function setTopValue(svg) {
  svg.style.top = document.documentElement.clientHeight * 0.5 - (svg.getBoundingClientRect().height * 0.5) + 'px';
}


// function setProgress(container, pct, progressBar, totalLength) {
//   const clientHeight = document.documentElement.clientHeight;
//   const scrollHeight = document.documentElement.scrollHeight;
//   const scrollTop = document.documentElement.scrollTop;
  
//   const percentage = scrollTop / (scrollHeight - clientHeight);
//   if(percentage === 1) {
//     container.classList.add('completed');
//   } else {
//     container.classList.remove('completed');
//   }
//   pct.innerHTML = Math.round(percentage * 100) + '%';
//   progressBar.style.strokeDashoffset = totalLength - totalLength * percentage;  
// }


window.onload = function() {
  const progressContainer = document.querySelector('.progress-container');  // Updated selector
  const svg = document.querySelector('svg');
  const progressBar = document.querySelector('.progress-bar');
  const pct = document.querySelector('.pct');
  const totalLength = progressBar.getTotalLength();

  // Set the initial top position of the SVG
  setTopValue(svg);
  
  // Initialize strokeDasharray and strokeDashoffset
  progressBar.style.strokeDasharray = totalLength;
  progressBar.style.strokeDashoffset = totalLength;
  
  // Add scroll event listener
  window.addEventListener('scroll', () => {
    setProgress(progressContainer, pct, progressBar, totalLength);  // Updated function call
  });

  // Adjust position of the SVG on resize
  window.addEventListener('resize', () => {
    setTopValue(svg);
  });
}

// Function to set the top value of the SVG container
function setTopValue(svg) {
  svg.style.top = document.documentElement.clientHeight * 0.5 - (svg.getBoundingClientRect().height * 0.5) + 'px';
}

// Function to set the progress based on the scroll position
function setProgress(progressContainer, pct, progressBar, totalLength) {  // Updated parameter name
  const clientHeight = document.documentElement.clientHeight;
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop;

  // Calculate the scroll percentage
  const percentage = scrollTop / (scrollHeight - clientHeight);

  // If scroll reaches the bottom, add the 'completed' class
  if(percentage === 1) {
    progressContainer.classList.add('completed');
  } else {
    progressContainer.classList.remove('completed');
  }

  // Update the percentage text
  pct.innerHTML = Math.round(percentage * 100) + '%';
  
  // Update the strokeDashoffset to animate the progress circle
  progressBar.style.strokeDashoffset = totalLength - totalLength * percentage;  
}


function scrollToTop() {
    window.scrollTo({
      top: 0,               // Scroll to the top of the page
      behavior: 'smooth'     // Smooth scrolling effect
    });
  }
  