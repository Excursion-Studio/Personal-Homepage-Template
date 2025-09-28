// Written by Constantine Heinrich Chen (ConsHein Chen)
// Last Change: 2025-09-29

// Function to check and update tab visibility based on content
function checkExperiencesTabVisibility() {
    // Check if experiences section exists
    const experiencesSection = document.getElementById('experiences');
    if (!experiencesSection) return;
    
    // Get tab buttons
    const educationTab = document.querySelector('.tab-button[data-tab="education"]');
    const employmentTab = document.querySelector('.tab-button[data-tab="employment"]');
    const honorsTab = document.querySelector('.tab-button[data-tab="honors-awards"]');
    const teachingTab = document.querySelector('.tab-button[data-tab="teaching"]');
    const reviewerTab = document.querySelector('.tab-button[data-tab="reviewer"]');
    
    // Check content and hide tabs if needed
    if (educationTab && !hasContent('education-container')) {
        educationTab.style.display = 'none';
    }
    
    if (employmentTab && !hasContent('employment-container')) {
        employmentTab.style.display = 'none';
    }
    
    if (honorsTab && !hasContent('honors-awards-container')) {
        honorsTab.style.display = 'none';
    }
    
    if (teachingTab && !hasContent('teaching-container')) {
        teachingTab.style.display = 'none';
    }
    
    if (reviewerTab && !hasContent('reviewer-container')) {
        reviewerTab.style.display = 'none';
    }
    
    // If all tabs are hidden, hide the entire experiences section
    const allTabs = [educationTab, employmentTab, honorsTab, teachingTab, reviewerTab];
    const visibleTabs = allTabs.filter(tab => tab && tab.style.display !== 'none');
    
    if (visibleTabs.length === 0) {
        experiencesSection.style.display = 'none';
    }
    
    // Ensure at least one tab is active and visible
    if (visibleTabs.length > 0) {
        // Check if the currently active tab is visible
        const activeTab = document.querySelector('.tab-button.active');
        if (activeTab && activeTab.style.display === 'none') {
            // If active tab is hidden, activate the first visible tab
            activeTab.classList.remove('active');
            const firstVisibleTab = visibleTabs[0];
            firstVisibleTab.classList.add('active');
            
            // Also activate the corresponding pane
            const tabId = firstVisibleTab.getAttribute('data-tab');
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            const targetPane = document.getElementById(tabId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
            
            // Update the stored state
            if (typeof activeTabStates !== 'undefined') {
                activeTabStates.experiences = tabId;
            }
        }
    }
}

// Function to load experiences content
function loadExperiencesContent() {
    // Create experiences section
    const experiencesSection = document.createElement('div');
    experiencesSection.id = 'experiences-content';
    
    // Create tab buttons container
    const tabButtonsContainer = document.createElement('div');
    tabButtonsContainer.className = 'tab-buttons-container';
    
    // Create tab buttons
    const educationTab = document.createElement('button');
    educationTab.className = 'tab-button active';
    educationTab.setAttribute('data-tab', 'education');
    educationTab.textContent = getText('institutionExperiences');
    
    const employmentTab = document.createElement('button');
    employmentTab.className = 'tab-button';
    employmentTab.setAttribute('data-tab', 'employment');
    employmentTab.textContent = getText('employment');
    
    const honorsTab = document.createElement('button');
    honorsTab.className = 'tab-button';
    honorsTab.setAttribute('data-tab', 'honors-awards');
    honorsTab.textContent = getText('honorsAndAwards');
    
    const teachingTab = document.createElement('button');
    teachingTab.className = 'tab-button';
    teachingTab.setAttribute('data-tab', 'teaching');
    teachingTab.textContent = getText('teaching');
    
    const reviewerTab = document.createElement('button');
    reviewerTab.className = 'tab-button';
    reviewerTab.setAttribute('data-tab', 'reviewer');
    reviewerTab.textContent = getText('reviewer');
    
    // Add tab buttons to container
    tabButtonsContainer.appendChild(educationTab);
    tabButtonsContainer.appendChild(employmentTab);
    tabButtonsContainer.appendChild(honorsTab);
    tabButtonsContainer.appendChild(teachingTab);
    tabButtonsContainer.appendChild(reviewerTab);
    
    // Create tab content container
    const tabContentContainer = document.createElement('div');
    tabContentContainer.className = 'tab-content-container';
    
    // Create tab panes
    const educationPane = document.createElement('div');
    educationPane.id = 'education';
    educationPane.className = 'tab-pane active';
    educationPane.innerHTML = `<div id="education-container" class="modules-container"></div>`;
    
    const employmentPane = document.createElement('div');
    employmentPane.id = 'employment';
    employmentPane.className = 'tab-pane';
    employmentPane.innerHTML = `<div id="employment-container" class="modules-container"></div>`;
    
    const honorsPane = document.createElement('div');
    honorsPane.id = 'honors-awards';
    honorsPane.className = 'tab-pane';
    honorsPane.innerHTML = `<div id="honors-awards-container" class="modules-container"></div>`;
    
    const teachingPane = document.createElement('div');
    teachingPane.id = 'teaching';
    teachingPane.className = 'tab-pane';
    teachingPane.innerHTML = `<div id="teaching-container" class="modules-container"></div>`;
    
    const reviewerPane = document.createElement('div');
    reviewerPane.id = 'reviewer';
    reviewerPane.className = 'tab-pane';
    reviewerPane.innerHTML = `<div id="reviewer-container" class="modules-container"></div>`;
    
    // Add tab panes to container
    tabContentContainer.appendChild(educationPane);
    tabContentContainer.appendChild(employmentPane);
    tabContentContainer.appendChild(honorsPane);
    tabContentContainer.appendChild(teachingPane);
    tabContentContainer.appendChild(reviewerPane);
    
    // Add tab buttons and content to experiences section
    experiencesSection.appendChild(tabButtonsContainer);
    experiencesSection.appendChild(tabContentContainer);
    
    // Check tab visibility before loading content
    checkExperiencesTabVisibility();
    
    // Load content for each tab with a delay to ensure proper rendering
    setTimeout(() => {
        const lang = getCurrentLanguage();
        loadInstitutionExperiencesModules('education-container', lang);
        loadEmploymentModules('employment-container', lang);
        loadHonorsAwardsModules('honors-awards-container', lang);
        loadTeachingModules('teaching-container', lang);
        loadReviewerModules('reviewer-container', lang);
        
        // Check tab visibility again after loading content
        setTimeout(() => {
            checkExperiencesTabVisibility();
            
            // Rearrange floating elements if needed
            if (typeof rearrangeFloatingElements === 'function') {
                rearrangeFloatingElements();
            }
        }, 500);
    }, 100);
    
    // Add event listeners for tab switching
    tabButtonsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('tab-button')) {
            // Remove active class from all buttons and panes
            tabButtonsContainer.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            tabContentContainer.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            e.target.classList.add('active');
            const tabId = e.target.getAttribute('data-tab');
            const tabPane = document.getElementById(tabId);
            if (tabPane) {
                tabPane.classList.add('active');
            }
            
            // Update the stored state
            if (typeof activeTabStates !== 'undefined') {
                activeTabStates['experiences'] = tabId;
            }
            
            // Rearrange floating elements if needed
            if (typeof rearrangeFloatingElements === 'function') {
                setTimeout(rearrangeFloatingElements, 100);
            }
        }
    });
    
    return experiencesSection.outerHTML;
}

/**
 * Loads institution experiences modules from configuration
 * @param {string} containerId - The ID of the container element
 * @param {string} language - The language code
 */
function loadInstitutionExperiencesModules(containerId, language = 'en') {
    // First try to get preloaded content
    const preloadedEducation = getPreloadedContent('education');
    
    if (preloadedEducation) {
        // Use preloaded content
        const container = document.getElementById(containerId);
        if (!container) return;
        
        renderModuleContainers(preloadedEducation, 'education', containerId, language);
    } else {
        // Fall back to fetching content
        const configPath = language === 'zh' ? 
            'configs/zh/education_zh.json' : 
            'configs/en/education.json';
        
        fetch(configPath)
            .then(response => response.json())
            .then(data => {
                // All education in the current structure are education
                const educationData = data;
                
                // Get container element
                const container = document.getElementById(containerId);
                if (!container) return;
                
                renderModuleContainers(educationData, 'education', containerId, language);
            })
            .catch(error => {
                console.error('Error loading education modules:', error);
            });
    }
}



/**
 * Loads employment modules from configuration
 * @param {string} containerId - The ID of the container element
 * @param {string} language - The language code
 */
function loadEmploymentModules(containerId, language = 'en') {
    // First try to get preloaded content
    const preloadedEmployment = getPreloadedContent('employment');
    
    if (preloadedEmployment) {
        // Use preloaded content
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Check if there are any employment records
        if (preloadedEmployment && preloadedEmployment.length > 0) {
            // Map the data to the format expected by renderModuleContainers
            const employmentData = preloadedEmployment.map(employment => {
                // Create a details list for the employment record
                const details = employment.details.map(detail => ({
                    position: detail.position,
                    department: detail.department,
                    time: detail.time,
                    project: detail.project
                }));
                
                return {
                    company: employment.company,
                    logoSrc: employment.logoSrc,
                    link: employment.link,
                    details: details,
                    description: employment.company
                };
            });
            
            renderModuleContainers(employmentData, 'employment', containerId, language);
            
            // Show the tab button if it was hidden
            const tabButton = document.querySelector('.tab-button[data-tab="employment"]');
            if (tabButton) {
                tabButton.style.display = '';
            }
        } else {
            // Hide the tab button if no employment data
            const tabButton = document.querySelector('.tab-button[data-tab="employment"]');
            if (tabButton) {
                tabButton.style.display = 'none';
            }
        }
    } else {
        // Fall back to fetching content
        const configPath = language === 'zh' ? 
            'configs/zh/employment_zh.json' : 
            'configs/en/employment.json';
        
        fetch(configPath)
            .then(response => response.json())
            .then(data => {
                // Check if there are any employment records
                if (data && data.length > 0) {
                    // Get container element
                    const container = document.getElementById(containerId);
                    if (!container) return;
                    
                    // Map the data to the format expected by renderModuleContainers
                    const employmentData = data.map(employment => {
                        // Create a details list for the employment record
                        const details = employment.details.map(detail => ({
                            position: detail.position,
                            department: detail.department,
                            time: detail.time,
                            project: detail.project
                        }));
                        
                        return {
                        company: employment.company,
                        logoSrc: employment.logoSrc,
                        link: employment.link,
                        details: details,
                        description: employment.company
                    };
                    });
                    
                    renderModuleContainers(employmentData, 'employment', containerId, language);
                    
                    // Show the tab button if it was hidden
                    const tabButton = document.querySelector('.tab-button[data-tab="employment"]');
                    if (tabButton) {
                        tabButton.style.display = '';
                    }
                } else {
                    // Hide the tab button if no employment data
                    const tabButton = document.querySelector('.tab-button[data-tab="employment"]');
                    if (tabButton) {
                        tabButton.style.display = 'none';
                    }
                }
            })
            .catch(error => {
                console.error('Error loading employment modules:', error);
                
                // Hide the tab button if there's an error loading the data
                const tabButton = document.querySelector('.tab-button[data-tab="employment"]');
                if (tabButton) {
                    tabButton.style.display = 'none';
                }
            });
    }
}

/**
 * Loads honors and awards modules from configuration
 * @param {string} containerId - The ID of the container element
 * @param {string} language - The language code
 */
function loadHonorsAwardsModules(containerId, language = 'en') {
    // First try to get preloaded content
    const preloadedHonors = getPreloadedContent('honors');
    
    if (preloadedHonors) {
        // Use preloaded content
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Check if there are any honors
        if (preloadedHonors && preloadedHonors.length > 0) {
            // Map the data to the format expected by renderModuleContainers
            const honorsData = preloadedHonors.map(honor => ({
                title: honor.award,
                organization: honor.unit,
                time: honor.time,
                description: `${honor.award} - ${honor.unit}`
            }));
            
            renderModuleContainers(honorsData, 'honor', containerId, language);
            
            // Show the tab button if it was hidden
            const tabButton = document.querySelector('.tab-button[data-tab="honors-awards"]');
            if (tabButton) {
                tabButton.style.display = '';
            }
        } else {
            // Hide the tab button if no honors data
            const tabButton = document.querySelector('.tab-button[data-tab="honors-awards"]');
            if (tabButton) {
                tabButton.style.display = 'none';
            }
        }
    } else {
        // Fall back to fetching content
        const configPath = language === 'zh' ? 
            'configs/zh/honors_zh.json' : 
            'configs/en/honors.json';
        
        fetch(configPath)
            .then(response => response.json())
            .then(data => {
                // Check if there are any honors
                if (data && data.length > 0) {
                    // Get container element
                    const container = document.getElementById(containerId);
                    if (!container) return;
                    
                    // Map the data to the format expected by renderModuleContainers
                    const honorsData = data.map(honor => ({
                        title: honor.award,
                        organization: honor.unit,
                        time: honor.time,
                        description: `${honor.award} - ${honor.unit}`
                    }));
                    
                    renderModuleContainers(honorsData, 'honor', containerId, language, true);
                    
                    // Show the tab button if it was hidden
                    const tabButton = document.querySelector('.tab-button[data-tab="honors-awards"]');
                    if (tabButton) {
                        tabButton.style.display = '';
                    }
                } else {
                    // Hide the tab button if no honors data
                    const tabButton = document.querySelector('.tab-button[data-tab="honors-awards"]');
                    if (tabButton) {
                        tabButton.style.display = 'none';
                    }
                }
            })
            .catch(error => {
                console.error('Error loading honors and awards modules:', error);
                
                // Hide the tab button if there's an error loading the data
                const tabButton = document.querySelector('.tab-button[data-tab="honors-awards"]');
                if (tabButton) {
                    tabButton.style.display = 'none';
                }
            });
    }
}

/**
 * Loads teaching modules from configuration
 * @param {string} containerId - The ID of the container element
 * @param {string} language - The language code
 */
function loadTeachingModules(containerId, language = 'en') {
    // First try to get preloaded content
    const preloadedTeaching = getPreloadedContent('teaching');
    
    if (preloadedTeaching) {
        // Use preloaded content
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Check if there are any teaching experiences
        if (preloadedTeaching && preloadedTeaching.length > 0) {
            // Map the data to the format expected by renderModuleContainers
            const teachingData = preloadedTeaching.map(teaching => {
                const timeDisplay = language === 'zh' ? 
                    `${teaching.year || ''} ${teaching.season || ''}` : 
                    `${teaching.season || ''} ${teaching.year || ''}`;
                
                return {
                    title: `${teaching.code || ''} ${teaching.course || ''}${teaching.school ? ', ' + teaching.school : ''}`.trim(),
                    school: teaching.school || '',
                    code: teaching.code || '',
                    identity: teaching.identity || (language === 'zh' ? '助教' : 'Teaching Assistant'),
                    season: teaching.season || '',
                    year: teaching.year || '',
                    description: `${teaching.identity || (language === 'zh' ? '助教' : 'Teaching Assistant')} - ${timeDisplay}`.trim()
                };
            });
            
            renderModuleContainers(teachingData, 'teaching', containerId, language);
            
            // Show the tab button if it was hidden
            const tabButton = document.querySelector('.tab-button[data-tab="teaching"]');
            if (tabButton) {
                tabButton.style.display = '';
            }
        } else {
            // Hide the tab button if no teaching data
            const tabButton = document.querySelector('.tab-button[data-tab="teaching"]');
            if (tabButton) {
                tabButton.style.display = 'none';
            }
        }
    } else {
        // Fall back to fetching content
        const configPath = language === 'zh' ? 
            'configs/zh/teaching_zh.json' : 
            'configs/en/teaching.json';
        
        fetch(configPath)
            .then(response => response.json())
            .then(data => {
                // Check if there are any teaching experiences
                if (data && data.length > 0) {
                    // Get container element
                    const container = document.getElementById(containerId);
                    if (!container) return;
                    
                    // Map the data to the format expected by renderModuleContainers
                    const teachingData = data.map(teaching => {
                        const timeDisplay = language === 'zh' ? 
                            `${teaching.year || ''} ${teaching.season || ''}` : 
                            `${teaching.season || ''} ${teaching.year || ''}`;
                        
                        return {
                            title: `${teaching.code || ''} ${teaching.course || ''}${teaching.school ? ', ' + teaching.school : ''}`.trim(),
                            school: teaching.school || '',
                            code: teaching.code || '',
                            identity: teaching.identity || (language === 'zh' ? '助教' : 'Teaching Assistant'),
                            season: teaching.season || '',
                            year: teaching.year || '',
                            description: `${teaching.identity || (language === 'zh' ? '助教' : 'Teaching Assistant')} - ${timeDisplay}`.trim()
                        };
                    });
                    
                    renderModuleContainers(teachingData, 'teaching', containerId, language);
                    
                    // Show the tab button if it was hidden
                    const tabButton = document.querySelector('.tab-button[data-tab="teaching"]');
                    if (tabButton) {
                        tabButton.style.display = '';
                    }
                } else {
                    // Hide the tab button if no teaching data
                    const tabButton = document.querySelector('.tab-button[data-tab="teaching"]');
                    if (tabButton) {
                        tabButton.style.display = 'none';
                    }
                }
            })
            .catch(error => {
                console.error('Error loading teaching modules:', error);
                
                // Hide the tab button if there's an error loading the data
                const tabButton = document.querySelector('.tab-button[data-tab="teaching"]');
                if (tabButton) {
                    tabButton.style.display = 'none';
                }
            });
    }
}

/**
 * Loads reviewer modules from configuration
 * @param {string} containerId - The ID of the container element
 * @param {string} language - The language code
 */
function loadReviewerModules(containerId, language = 'en') {
    // First try to get preloaded content
    const preloadedReviewer = getPreloadedContent('reviewer');
    
    if (preloadedReviewer) {
        // Use preloaded content
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Check if there are any reviewer experiences
        if (preloadedReviewer && preloadedReviewer.length > 0) {
            // Process and merge reviewer data
            const processedReviewerData = processReviewerData(preloadedReviewer, language);
            
            renderModuleContainers(processedReviewerData, 'reviewer', containerId, language);
            
            // Show the tab button if it was hidden
            const tabButton = document.querySelector('.tab-button[data-tab="reviewer"]');
            if (tabButton) {
                tabButton.style.display = '';
            }
        } else {
            // Hide the tab button if no reviewer data
            const tabButton = document.querySelector('.tab-button[data-tab="reviewer"]');
            if (tabButton) {
                tabButton.style.display = 'none';
            }
        }
    } else {
        // Fall back to fetching content
        const configPath = language === 'zh' ? 
            'configs/zh/reviewer_zh.json' : 
            'configs/en/reviewer.json';
        
        fetch(configPath)
            .then(response => response.json())
            .then(data => {
                // Check if there are any reviewer experiences
                if (data && data.length > 0) {
                    // Get container element
                    const container = document.getElementById(containerId);
                    if (!container) return;
                    
                    // Process and merge reviewer data
                    const processedReviewerData = processReviewerData(data, language);
                    
                    renderModuleContainers(processedReviewerData, 'reviewer', containerId, language);
                    
                    // Show the tab button if it was hidden
                    const tabButton = document.querySelector('.tab-button[data-tab="reviewer"]');
                    if (tabButton) {
                        tabButton.style.display = '';
                    }
                } else {
                    // Hide the tab button if no reviewer data
                    const tabButton = document.querySelector('.tab-button[data-tab="reviewer"]');
                    if (tabButton) {
                        tabButton.style.display = 'none';
                    }
                }
            })
            .catch(error => {
                console.error('Error loading reviewer modules:', error);
                
                // Hide the tab button if there's an error loading the data
                const tabButton = document.querySelector('.tab-button[data-tab="reviewer"]');
                if (tabButton) {
                    tabButton.style.display = 'none';
                }
            });
    }
}

/**
 * Processes reviewer data to merge entries with the same conference/journal but different years
 * @param {Array} reviewerData - The raw reviewer data
 * @param {string} language - The language code
 * @returns {Array} - Processed reviewer data with merged entries
 */
function processReviewerData(reviewerData, language = 'en') {
    // Create a map to group by conference/journal name
    const reviewerMap = new Map();
    
    reviewerData.forEach(reviewer => {
        // Use conference or journal as the key
        const key = reviewer.conference || reviewer.journal;
        
        if (reviewerMap.has(key)) {
            // If the key already exists, add the year to the existing entry
            const existingEntry = reviewerMap.get(key);
            if (!existingEntry.years.includes(reviewer.year)) {
                existingEntry.years.push(reviewer.year);
            }
        } else {
            // If the key doesn't exist, create a new entry
            reviewerMap.set(key, {
                title: key,
                years: [reviewer.year],
                type: reviewer.conference ? 'conference' : 'journal'
            });
        }
    });
    
    // Convert the map back to an array and sort years
    const processedData = Array.from(reviewerMap.values()).map(entry => {
        // Sort years in ascending order
        entry.years.sort((a, b) => parseInt(a) - parseInt(b));
        
        // Join years with slashes
        const yearsString = entry.years.join(' / ');
        
        return {
            title: entry.title,
            description: `${language === 'zh' ? '年份：' : 'Year: '}${yearsString}`,
            time: null // Set to null to use the custom description format
        };
    });
    
    return processedData;
}

// Export functions to be used by other modules
window.loadExperiencesContent = loadExperiencesContent;
window.loadInstitutionExperiencesModules = loadInstitutionExperiencesModules;
window.loadEmploymentModules = loadEmploymentModules;
window.loadHonorsAwardsModules = loadHonorsAwardsModules;
window.loadTeachingModules = loadTeachingModules;
window.loadReviewerModules = loadReviewerModules;