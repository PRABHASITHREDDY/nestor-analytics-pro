// Model
const model = {
    tabs: [],
    activeTab: null,
};

// View
function renderTabs() {
    $('#tabs-container').empty();
    model.tabs.forEach((tab, index) => {
        const tabElement = $('<div>')
            .addClass('tab')
            .addClass(tab === model.activeTab ? 'active' : '')
            .text(`Tab ${index + 1}`)
            .click(() => setActiveTab(index));
        
        const closeButton = $('<span>')
            .addClass('close-btn')
            .text('×')
            .click((event) => {
                event.stopPropagation();
                closeTab(index);
            });

        tabElement.append(closeButton);
        $('#tabs-container').append(tabElement);
    });
}

function renderIframeContent() {
    if (model.activeTab) {
        $('#url-input').val(model.activeTab.url);
        $('#iframe-content').attr('src', model.activeTab.url);
    } else {
        $('#url-input').val('');
        $('#iframe-content').attr('src', '');
    }
}

// Controller
function addTab() {
    const newTab = {
        url: '',
    };
    model.tabs.push(newTab);
    setActiveTab(model.tabs.length - 1);
}

function setActiveTab(index) {
    model.activeTab = model.tabs[index];
    renderTabs();
    renderIframeContent();
}

function closeTab(index) {
    model.tabs.splice(index, 1);
    if (model.tabs.length > 0) {
        setActiveTab(Math.min(index, model.tabs.length - 1));
    } else {
        model.activeTab = null;
        renderTabs();
        renderIframeContent();
    }
}

function updateURL(url) {
    if (model.activeTab) {
        model.activeTab.url = url;
        renderIframeContent();
    }
}

// Event listeners and initial setup
$(document).ready(() => {
    // Event listener for the "Add New Tab" button
    $('#add-tab-btn').click(addTab);

    // Event listener for the URL input field to handle Enter key press
    $('#url-input').on('keydown', (event) => {
        if (event.key === 'Enter') { // Check for the Enter key
            event.preventDefault(); // Prevent form submission
            const url = $('#url-input').val();
            updateURL(url);
        }
    });

    // Initial setup: Add a default tab
    addTab();

    // Initial render
    renderTabs();
    renderIframeContent();
});
