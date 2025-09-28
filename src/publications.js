// Written by Constantine Heinrich Chen (ConsHein Chen)
// Last Change: 2025-09-29

// Publications section content
// Chinese text inherits English structure, only differs in nouns and data introduction
// Function to check and update tab visibility based on content
function checkPublicationsTabVisibility() {
    // Check if publications section exists
    const publicationsSection = document.getElementById('publications');
    if (!publicationsSection) return;
    
    // Get tab buttons
    const articlesTab = document.querySelector('.tab-button[data-tab="articles"]');
    const preprintsTab = document.querySelector('.tab-button[data-tab="preprints"]');
    const conferencesTab = document.querySelector('.tab-button[data-tab="conferences"]');
    const patentsTab = document.querySelector('.tab-button[data-tab="patents"]');
    const datasetsTab = document.querySelector('.tab-button[data-tab="datasets"]');
    
    // Check content and hide tabs if needed
    if (articlesTab && !hasContent('articles-container')) {
        articlesTab.style.display = 'none';
    }
    
    if (preprintsTab && !hasContent('preprints-container')) {
        preprintsTab.style.display = 'none';
    }
    
    if (conferencesTab && !hasContent('conferences-container')) {
        conferencesTab.style.display = 'none';
    }
    
    if (patentsTab && !hasContent('patents-container')) {
        patentsTab.style.display = 'none';
    }
    
    if (datasetsTab && !hasContent('datasets-container')) {
        datasetsTab.style.display = 'none';
    }
    
    // If all tabs are hidden, hide the entire publications section
    const allTabs = [articlesTab, preprintsTab, conferencesTab, patentsTab, datasetsTab];
    const visibleTabs = allTabs.filter(tab => tab && tab.style.display !== 'none');
    
    if (visibleTabs.length === 0) {
        publicationsSection.style.display = 'none';
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
                activeTabStates.publications = tabId;
            }
        }
    }
}

// Function to load publications content
function loadPublicationsContent() {
    // Create publications section
    const publicationsSection = document.createElement('div');
    publicationsSection.id = 'publications-content';
    
    // Create tab buttons container
    const tabButtonsContainer = document.createElement('div');
    tabButtonsContainer.className = 'tab-buttons-container';
    
    // Create tab buttons
    const articlesTab = document.createElement('button');
    articlesTab.className = 'tab-button active';
    articlesTab.setAttribute('data-tab', 'articles');
    articlesTab.textContent = getText('articles');
    
    const preprintsTab = document.createElement('button');
    preprintsTab.className = 'tab-button';
    preprintsTab.setAttribute('data-tab', 'preprints');
    preprintsTab.textContent = getText('preprints');
    
    const conferencesTab = document.createElement('button');
    conferencesTab.className = 'tab-button';
    conferencesTab.setAttribute('data-tab', 'conferences');
    conferencesTab.textContent = getText('conferences');
    
    const patentsTab = document.createElement('button');
    patentsTab.className = 'tab-button';
    patentsTab.setAttribute('data-tab', 'patents');
    patentsTab.textContent = getText('patents');
    
    const datasetsTab = document.createElement('button');
    datasetsTab.className = 'tab-button';
    datasetsTab.setAttribute('data-tab', 'datasets');
    datasetsTab.textContent = getText('datasets');
    
    // Add tab buttons to container
    tabButtonsContainer.appendChild(articlesTab);
    tabButtonsContainer.appendChild(preprintsTab);
    tabButtonsContainer.appendChild(conferencesTab);
    tabButtonsContainer.appendChild(patentsTab);
    tabButtonsContainer.appendChild(datasetsTab);
    
    // Create tab content container
    const tabContentContainer = document.createElement('div');
    tabContentContainer.className = 'tab-content-container';
    
    // Create tab panes
    const articlesPane = document.createElement('div');
    articlesPane.id = 'articles';
    articlesPane.className = 'tab-pane active';
    articlesPane.innerHTML = `<div id="articles-container" class="modules-container"></div>`;
    
    const preprintsPane = document.createElement('div');
    preprintsPane.id = 'preprints';
    preprintsPane.className = 'tab-pane';
    preprintsPane.innerHTML = `<div id="preprints-container" class="modules-container"></div>`;
    
    const conferencesPane = document.createElement('div');
    conferencesPane.id = 'conferences';
    conferencesPane.className = 'tab-pane';
    conferencesPane.innerHTML = `<div id="conferences-container" class="modules-container"></div>`;
    
    const patentsPane = document.createElement('div');
    patentsPane.id = 'patents';
    patentsPane.className = 'tab-pane';
    patentsPane.innerHTML = `<div id="patents-container" class="modules-container"></div>`;
    
    const datasetsPane = document.createElement('div');
    datasetsPane.id = 'datasets';
    datasetsPane.className = 'tab-pane';
    datasetsPane.innerHTML = `<div id="datasets-container" class="modules-container"></div>`;
    
    // Add tab panes to container
    tabContentContainer.appendChild(articlesPane);
    tabContentContainer.appendChild(preprintsPane);
    tabContentContainer.appendChild(conferencesPane);
    tabContentContainer.appendChild(patentsPane);
    tabContentContainer.appendChild(datasetsPane);
    
    // Add tab buttons and content to publications section
    publicationsSection.appendChild(tabButtonsContainer);
    publicationsSection.appendChild(tabContentContainer);
    
    // Check tab visibility before loading content
    checkPublicationsTabVisibility();
    
    // Load content for each tab with a delay to ensure proper rendering
    setTimeout(() => {
        const lang = getCurrentLanguage();
        loadArticlesModules('articles-container', lang);
        loadPreprintsModules('preprints-container', lang);
        loadConferencesModules('conferences-container', lang);
        loadPatentsModules('patents-container', lang);
        loadDatasetsModules('datasets-container', lang);
        
        // Check tab visibility again after loading content
        setTimeout(() => {
            checkPublicationsTabVisibility();
            
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
                activeTabStates['publications'] = tabId;
            }
            
            // Rearrange floating elements if needed
            if (typeof rearrangeFloatingElements === 'function') {
                setTimeout(rearrangeFloatingElements, 100);
            }
        }
    });
    
    return publicationsSection.outerHTML;
}

/**
 * Loads academic papers modules from configuration
 * @param {string} containerId - The ID of the container element
 * @param {string} language - The language code
 * Chinese text inherits English structure, only differs in nouns and data introduction
 */
function loadAcademicPapersModules(containerId, language = 'en') {
    // First try to get preloaded content
    const preloadedPapers = getPreloadedContent('papers');
    
    if (preloadedPapers) {
        // Use preloaded content
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Clear existing content
        container.innerHTML = '';
        
        // Check if there are any papers
        const years = Object.keys(preloadedPapers);
        if (years.length === 0) {
            // If no papers, show a message
            container.innerHTML = `
                <div class="no-content-message">
                    <p>${language === 'zh' ? '暂无学术论文。' : 'No academic papers to display at this time.'}</p>
                </div>
            `;
            return;
        }
        
        // Sort years in descending order (newest first)
        years.sort((a, b) => parseInt(b) - parseInt(a));
        
        // Create year sections and add papers
        years.forEach(year => {
            // Filter only academic papers for this year (Conference Paper, Journal Paper, etc.)
            const academicPapers = preloadedPapers[year].filter(paper => {
                if (!paper.type) return false;
                
                // Check for English paper types
                if (language === 'en') {
                    return paper.type.toLowerCase().includes('submission') || 
                           paper.type.toLowerCase().includes('journal') ||
                           paper.type.toLowerCase().includes('conference') ||
                           paper.type.toLowerCase().includes('workshop');
                }
                // Check for Chinese paper types
                else {
                    return paper.type.includes('在投') || 
                           paper.type.includes('期刊') || 
                           paper.type.includes('会议') ||
                           paper.type.includes('研讨会');
                }
            });
            
            // Only create year section if there are academic papers for this year
            if (academicPapers.length > 0) {
                // Create year header
                const yearHeader = document.createElement('div');
                yearHeader.className = 'year-header';
                yearHeader.innerHTML = `<h3>${year}</h3>`;
                container.appendChild(yearHeader);
                
                // Create a container for papers of this year
                const yearContainer = document.createElement('div');
                yearContainer.className = 'year-container';
                yearContainer.id = `year-${year}-container`;
                container.appendChild(yearContainer);
                
                // Add year to each paper
                academicPapers.forEach(paper => {
                    paper.year = year;
                });
                
                // Render papers for this year
                renderModuleContainers(academicPapers, 'publication', yearContainer.id, language);
            }
        });
    } else {
        // Fall back to fetching content
        const configPath = language === 'zh' ? 
            'configs/zh/papers_zh.json' : 
            'configs/en/papers.json';
        
        fetch(configPath)
            .then(response => response.json())
            .then(data => {
                // Get container element
                const container = document.getElementById(containerId);
                if (!container) return;
                
                // Clear existing content
                container.innerHTML = '';
                
                // Check if there are any papers
                const years = Object.keys(data);
                if (years.length === 0) {
                    // If no papers, show a message
                    container.innerHTML = `
                        <div class="no-content-message">
                            <p>${language === 'zh' ? '暂无学术论文。' : 'No academic papers to display at this time.'}</p>
                        </div>
                    `;
                    return;
                }
                
                // Sort years in descending order (newest first)
                years.sort((a, b) => parseInt(b) - parseInt(a));
                
                // Create year sections and add papers
                years.forEach(year => {
                    // Filter only academic papers for this year (Conference Paper, Journal Paper, etc.)
                    const academicPapers = data[year].filter(paper => {
                        if (!paper.type) return false;
                        
                        // Check for English paper types
                        if (language === 'en') {
                            return paper.type.toLowerCase().includes('paper') || 
                                   paper.type.toLowerCase().includes('journal') ||
                                   paper.type.toLowerCase().includes('conference') ||
                                   paper.type.toLowerCase().includes('proceedings');
                        }
                        // Check for Chinese paper types
                        else {
                            return paper.type.includes('论文') || 
                                   paper.type.includes('期刊') || 
                                   paper.type.includes('会议');
                        }
                    });
                    
                    // Only create year section if there are academic papers for this year
                    if (academicPapers.length > 0) {
                        // Create year header
                        const yearHeader = document.createElement('div');
                        yearHeader.className = 'year-header';
                        yearHeader.innerHTML = `<h3>${year}</h3>`;
                        container.appendChild(yearHeader);
                        
                        // Create a container for papers of this year
                        const yearContainer = document.createElement('div');
                        yearContainer.className = 'year-container';
                        yearContainer.id = `year-${year}-container`;
                        container.appendChild(yearContainer);
                        
                        // Add year to each paper
                        academicPapers.forEach(paper => {
                            paper.year = year;
                        });
                        
                        // Render papers for this year
                        renderModuleContainers(academicPapers, 'publication', yearContainer.id, language);
                    }
                });
            })
            .catch(error => {
                console.error('Error loading academic papers modules:', error);
            });
    }
}

/**
 * Load patents modules
 * @param {string} containerId - The ID of the container element
 * @param {string} language - The language code
 * Chinese text inherits English structure, only differs in nouns and data introduction
 */
function loadPatentsModules(containerId, language = 'en') {
    // First try to get preloaded content
    const preloadedPatents = getPreloadedContent('patents');
    
    if (preloadedPatents) {
        // Use preloaded content
        // Check if there are any patents
        if (preloadedPatents && preloadedPatents.patents && preloadedPatents.patents.length > 0) {
            // Get container element
            const container = document.getElementById(containerId);
            if (!container) return;
            
            // Map the data to the format expected by renderModuleContainers
            const patentsData = preloadedPatents.patents.map(patent => ({
                title: patent.title,
                authors: patent.authors,
                type: patent.type,
                number: patent.number,
                date: patent.date,
                link: patent.link,
                description: `${patent.type} - ${patent.number}`
            }));
            
            renderModuleContainers(patentsData, 'patent', containerId, language);
            
            // Show the tab button if it was hidden
            const tabButton = document.querySelector('.tab-button[data-tab="patents"]');
            if (tabButton) {
                tabButton.style.display = '';
            }
        } else {
            // Hide the tab button if no patents data
            const tabButton = document.querySelector('.tab-button[data-tab="patents"]');
            if (tabButton) {
                tabButton.style.display = 'none';
            }
        }
    } else {
        // Fall back to fetching content
        const configPath = language === 'zh' ? 
            'configs/zh/patents_zh.json' : 
            'configs/en/patents.json';
        
        fetch(configPath)
            .then(response => response.json())
            .then(data => {
                // Check if there are any patents
                if (data && data.patents && data.patents.length > 0) {
                    // Get container element
                    const container = document.getElementById(containerId);
                    if (!container) return;
                    
                    // Map the data to the format expected by renderModuleContainers
                    const patentsData = data.patents.map(patent => ({
                        title: patent.title,
                        authors: patent.authors,
                        type: patent.type,
                        number: patent.number,
                        date: patent.date,
                        link: patent.link,
                        description: `${patent.type} - ${patent.number}`
                    }));
                    
                    renderModuleContainers(patentsData, 'patent', containerId, language);
                    
                    // Show the tab button if it was hidden
                    const tabButton = document.querySelector('.tab-button[data-tab="patents"]');
                    if (tabButton) {
                        tabButton.style.display = '';
                    }
                } else {
                    // Hide the tab button if no patents data
                    const tabButton = document.querySelector('.tab-button[data-tab="patents"]');
                    if (tabButton) {
                        tabButton.style.display = 'none';
                    }
                }
            })
            .catch(error => {
                console.error('Error loading patents modules:', error);
                
                // Hide the tab button if there's an error loading the data
                const tabButton = document.querySelector('.tab-button[data-tab="patents"]');
                if (tabButton) {
                    tabButton.style.display = 'none';
                }
            });
    }
}

// Export functions for use in other modules
window.loadPublicationsContent = loadPublicationsContent;
window.loadAcademicPapersModules = loadAcademicPapersModules;
window.loadPatentsModules = loadPatentsModules;