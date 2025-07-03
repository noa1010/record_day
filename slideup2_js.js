window.addEventListener("scroll", function() {
  var navbar = document.getElementById("myNavBar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ************ פונקציית המבורגר חדשה ************
function toggleMenu() {
  var navLinks = document.querySelector(".nav-links");
  if (navLinks.classList.contains("responsive")) {
    navLinks.classList.remove("responsive");
  } else {
    navLinks.classList.add("responsive");
  }
}
// ************ סיום פונקציית המבורגר ************


document.addEventListener('DOMContentLoaded', () => {
    // אלמנטים לחיפוש לפי מילות מפתח
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultsContainer = document.getElementById('results');

    // אלמנטים לסיכום מקישור
    const linkInput = document.getElementById('linkInput');
    const summarizeButton = document.getElementById('summarizeButton');
    const summaryResultsContainer = document.getElementById('summaryResults');

    // מאזינים לאירועי חיפוש
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    // מאזינים לאירועי סיכום
    summarizeButton.addEventListener('click', summarizeArticle);
    linkInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            summarizeArticle();
        }
    });

    // --- פונקציית חיפוש (כמו קודם) ---
    async function performSearch() {
        const query = searchInput.value.trim();
        if (!query) {
            resultsContainer.innerHTML = '<p class="no-results">Please enter a search topic.</p>';
            return;
        }

        resultsContainer.innerHTML = '<p class="no-results">looking for...</p>'; // מרכז את הודעת הטעינה

        const wikipediaApiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;

        try {
            const response = await fetch(wikipediaApiUrl);
            const data = await response.json();

            displaySearchResults(data.query.search);
        } catch (error) {
            console.error('Error accessing Wikipedia API (Search):', error);
            resultsContainer.innerHTML = '<p class="no-results">A search error occurred. Please try again later.</p>';
        }
    }

    function displaySearchResults(results) {
        resultsContainer.innerHTML = ''; // נקה תוצאות קודמות

        if (results && results.length > 0) {
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('result-item');

                const title = document.createElement('h3');
                title.textContent = result.title;

                const snippet = document.createElement('p');
                // הסרת תגי HTML מהתקציר והצגת טקסט נקי
                snippet.innerHTML = result.snippet.replace(/<\/?span[^>]*>/g, '');

                const link = document.createElement('a');
                link.href = `https://en.wikipedia.org/wiki/${encodeURIComponent(result.title)}`;
                link.textContent = 'Read more on Wikipedia';
                link.target = '_blank'; // פתח בטאב חדש

                resultItem.appendChild(title);
                resultItem.appendChild(snippet);
                resultItem.appendChild(link);
                resultsContainer.appendChild(resultItem);
            });
        } else {
            resultsContainer.innerHTML = '<p class="no-results">No results were found for your search.</p>';
        }
    }

    // --- פונקציית סיכום חדשה ---
    async function summarizeArticle() {
        const link = linkInput.value.trim();
        if (!link) {
            summaryResultsContainer.innerHTML = '<p class="no-results">Please insert a link to the Wikipedia entry.</p>';
            return;
        }

        // חילוץ שם הערך מהקישור
        // לדוגמה: מ-https://en.wikipedia.org/wiki/JavaScript נחלץ JavaScript
        const wikipediaTitleMatch = link.match(/\/wiki\/(.+)/);
        if (!wikipediaTitleMatch || wikipediaTitleMatch[1].includes(':')) { // למנוע קישורי קטגוריה/תבנית
            summaryResultsContainer.innerHTML = '<p class="no-results">Wikipedia link is invalid. Please make sure it points directly to the entry (for example: https://en.wikipedia.org/wiki/JavaScript).</p>';
            return;
        }
        const articleTitle = decodeURIComponent(wikipediaTitleMatch[1]).replace(/_/g, ' '); // החלפת קווים תחתונים ברווחים

        summaryResultsContainer.innerHTML = '<p class="no-results">מטעין ומסכם...</p>';

        // API לגישת תוכן של עמוד (extracts)
        const summaryApiUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${encodeURIComponent(articleTitle)}&format=json&origin=*`;

        try {
            const response = await fetch(summaryApiUrl);
            const data = await response.json();

            // איתור העמוד בתוך התשובה
            const pages = data.query.pages;
            const pageId = Object.keys(pages)[0];
            const extract = pages[pageId].extract;

            displaySummary(articleTitle, extract);
        } catch (error) {
            console.error('Error accessing Wikipedia API (summary):', error);
            summaryResultsContainer.innerHTML = '<p class="no-results">There was an error retrieving the summary. Please make sure the link is correct and try again.</p>';
        }
    }

    function displaySummary(title, content) {
        summaryResultsContainer.innerHTML = ''; // נקה תוצאות קודמות

        if (content) {
            const summaryItem = document.createElement('div');
            summaryItem.classList.add('summary-content');

            const summaryTitle = document.createElement('h3');
            summaryTitle.textContent = `Summary for: ${title}`;
            summaryTitle.style.textAlign = 'center'; // למרכז את כותרת הסיכום

            const summaryText = document.createElement('p');
            summaryText.innerHTML = content.split('\n')[0] || content; // קח את הפסקה הראשונה או את כל התוכן

            summaryItem.appendChild(summaryTitle);
            summaryItem.appendChild(summaryText);
            summaryResultsContainer.appendChild(summaryItem);
        } else {
            summaryResultsContainer.innerHTML = '<p class="no-results">The content for this link could not be summarized. The entry may not be found or may not have a summary.</p>';
        }
    }
});

function img1(){
  window.location.href = "https://www.canva.com/design/DAGrMVVhAlQ/5lbKRGyWDd8TvptQs5Wl_g/edit?utm_content=DAGrMVVhAlQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"; // נווט לקישור
}
function img2(){
  window.location.href = "https://www.canva.com/design/DAGrMTm_Sf4/9I8K4ClwO1aGVqYNY4mQYg/edit?utm_content=DAGrMTm_Sf4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"; // נווט לקישור
}
 function img3(){
  window.location.href = "https://www.canva.com/design/DAGrMfpfBp4/AqM0UQqgA2x96OvKJEJ1vA/edit?utm_content=DAGrMfpfBp4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"; // נווט לקישור
}
 function img4(){
  window.location.href = "https://www.canva.com/design/DAGrMdhM0iE/YXv8fatMyFtCoN9NHtSdkQ/edit?utm_content=DAGrMdhM0iE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"; // נווט לקישור
}
 function img5(){
  window.location.href = "https://www.canva.com/design/DAGrMqigeSc/6C1zTloVt_gmxmJh3I6nKQ/edit?utm_content=DAGrMqigeSc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"; // נווט לקישור
}
 function img6(){
  window.location.href = "https://www.canva.com/design/DAGrMrr6xIc/1eZy9N7aufJOqkeGTGWZ9Q/edit?utm_content=DAGrMrr6xIc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"; // נווט לקישור
}
 function img7(){
  window.location.href = "https://www.canva.com/design/DAGrMjbdC_Q/cqPdjUhEiN5er2BWqr1lYw/edit?utm_content=DAGrMjbdC_Q&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"; // נווט לקישור
}
 function img8(){
  window.location.href = "https://www.canva.com/design/DAGrMqdr2Sw/nSpF1-V95aQiJ3TnQgyspA/edit?utm_content=DAGrMqdr2Sw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"; // נווט לקישור
}
 function img9(){
  window.location.href = "https://www.canva.com/design/DAGrMcRnb8g/EwapS7nvnzx-g3eXhx1caA/edit?utm_content=DAGrMcRnb8g&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"; // נווט לקישור
}
 function img10(){
  window.location.href = "https://www.canva.com/design/DAGsGjO43RE/X9-m9ZhohnrB73bMphhtJA/edit?utm_content=DAGsGjO43RE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"; // נווט לקישור
}
