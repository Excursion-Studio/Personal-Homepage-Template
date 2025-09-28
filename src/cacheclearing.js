// Written by Constantine Heinrich Chen (ConsHein Chen)
// Last Change: 2025-09-29

// Cache clearing module
// This module provides functions to clear page cache to ensure proper language switching and page transitions

// Track the last language change time to avoid excessive cache clearing
let lastLanguageChangeTime = 0;
const MIN_LANGUAGE_CHANGE_INTERVAL = 2000; // Increased to 2 seconds minimum between language changes

// Function to check if a container has any content
function hasContent(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return false;
    
    // Check if container has any child elements
    return container.children.length > 0;
}

// Function to check and hide tabs for experiences section
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
}

// Function to check and hide tabs for publications section
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
}

/**
 * Clears page cache to ensure fresh content loading
 */
function clearPageCache() {
    console.log('Clearing page cache...');
    
    // Clear fetch cache
    if ('caches' in window) {
        caches.keys().then(cacheNames => {
            cacheNames.forEach(cacheName => {
                caches.delete(cacheName);
                console.log('Deleted cache:', cacheName);
            });
        });
    }

    // Clear module containers
    const moduleContainers = document.querySelectorAll('.modules-container');
    moduleContainers.forEach(container => {
        container.innerHTML = '';
    });

    // Reset preloaded content
    if (typeof preloadedContent !== 'undefined') {
        // Clear the preloaded content object
        for (let key in preloadedContent) {
            if (preloadedContent.hasOwnProperty(key)) {
                delete preloadedContent[key];
            }
        }
        console.log('Preloaded content cleared');
    }

    // Reset content preloaded flag
    if (typeof isContentPreloaded !== 'undefined') {
        isContentPreloaded = false;
        console.log('Content preloaded flag reset');
    }

    // Check and hide tabs for experiences and publications sections after a delay
    setTimeout(() => {
        // Use the global functions if available
        if (typeof checkExperiencesTabVisibility === 'function') {
            checkExperiencesTabVisibility();
            console.log('Experiences tab visibility checked');
        }
        
        if (typeof checkPublicationsTabVisibility === 'function') {
            checkPublicationsTabVisibility();
            console.log('Publications tab visibility checked');
        }
        
        // Trigger content preloading again after a short delay
        if (typeof preloadAllContent === 'function') {
            setTimeout(() => {
                preloadAllContent().then(() => {
                    console.log('Content preloading triggered after cache clear');
                    // Check tab visibility again after preloading
                    setTimeout(() => {
                        if (typeof checkExperiencesTabVisibility === 'function') {
                            checkExperiencesTabVisibility();
                        }
                        if (typeof checkPublicationsTabVisibility === 'function') {
                            checkPublicationsTabVisibility();
                        }
                    }, 500);
                });
            }, 100);
        }
    }, 300);
}

/**
 * Force complete page reload
 */
function forcePageReload() {
  // Add a timestamp to URL to prevent browser cache
  const timestamp = new Date().getTime();
  const currentUrl = window.location.href.split('?')[0];
  window.location.href = currentUrl + '?t=' + timestamp;
}

/**
 * Initialize cache clearing overrides and page load functionality
 */
function initializeCacheClearing() {
  // Intercept and block requests to /@vite/client to prevent 404 errors
  const originalFetch = window.fetch;
  window.fetch = function(url, options) {
    if (typeof url === 'string' && url.includes('/@vite/client')) {
      console.log('Blocked request to Vite client:', url);
      return Promise.reject(new Error('Vite client request blocked'));
    }
    return originalFetch.apply(this, arguments);
  };
  
  // Also intercept XMLHttpRequest
  const originalXHROpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, ...args) {
    if (typeof url === 'string' && url.includes('/@vite/client')) {
      console.log('Blocked XHR request to Vite client:', url);
      throw new Error('Vite client request blocked');
    }
    return originalXHROpen.apply(this, [method, url, ...args]);
  };
  
  // Override the original setLanguage function to include cache clearing
  if (typeof setLanguage === 'function') {
    const originalSetLanguage = setLanguage;
    window.setLanguage = function(lang) {
      // Only clear cache if language actually changed
      if (getCurrentLanguage() !== lang) {
        clearPageCache();
      }
      // Call original function
      originalSetLanguage(lang);
    };
  }
  
  // Override the original toggleLanguage function to include cache clearing
  if (typeof toggleLanguage === 'function') {
    const originalToggleLanguage = toggleLanguage;
    window.toggleLanguage = function() {
      // Call original function without clearing cache here
      // The cache will be cleared in the setLanguage function instead
      originalToggleLanguage();
    };
  }
  
  // Override the original reloadContent function to include cache clearing
  if (typeof reloadContent === 'function') {
    const originalReloadContent = reloadContent;
    window.reloadContent = function() {
      // Don't clear cache here as it's already cleared in setLanguage
      // Call original function
      originalReloadContent();
    };
  }
  
  // Override the original switchSection function to include cache clearing
  if (typeof switchSection === 'function') {
    const originalSwitchSection = switchSection;
    window.switchSection = function(sectionId) {
      // Clear cache before section switch
      clearPageCache();
      // Call original function
      originalSwitchSection(sectionId);
    };
  }
  
  // Simplified navigation click handler to reduce performance impact
  document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.closest('.nav-links')) {
      // Get current language before navigation
      const currentLang = getCurrentLanguage();
      
      // After navigation, ensure the new content uses the correct language
      setTimeout(() => {
        // Ensure the language is still correct after navigation
        if (getCurrentLanguage() !== currentLang) {
          // Only set language if it actually changed
          // This prevents unnecessary cache clearing
          setLanguage(currentLang);
        }
        
        // Update UI language elements
        updateUILanguage();
        
        // If the active section changed, ensure its content is in the correct language
        const activeSection = document.querySelector('.content-section.active');
        if (activeSection) {
          const sectionId = activeSection.id;
          // Use the centralized function to update section content
          if (typeof updateSectionContentLanguage === 'function') {
            updateSectionContentLanguage(sectionId);
          }
        }
      }, 100); // Slightly increased delay for smoother transition
    }
  }, true); // Use capture to ensure this runs before the original handler
  
  
}

// Initialize cache clearing when the page loads
window.onload = function() {
  initializeCacheClearing();
};

// Initialize cache clearing when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeCacheClearing();
});

// Export functions for use in other modules
window.clearPageCache = clearPageCache;
window.initializeCacheClearing = initializeCacheClearing;
window.forcePageReload = forcePageReload;
window.hasContent = hasContent;
window.checkExperiencesTabVisibility = checkExperiencesTabVisibility;
window.checkPublicationsTabVisibility = checkPublicationsTabVisibility;