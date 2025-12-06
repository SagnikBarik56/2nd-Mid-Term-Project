var quoteInput = document.getElementById('quoteInput');
var addBtn = document.getElementById('addBtn');
var quotesList = document.getElementById('quotesList');
var emptyMessage = document.getElementById('emptyMessage');

var quotes = [];

function loadQuotes() {
    var stored = localStorage.getItem('savedQuotes');
    if (stored) {
        quotes = JSON.parse(stored);
    }
}

function saveQuotes() {
    localStorage.setItem('savedQuotes', JSON.stringify(quotes));
}

function renderQuotes() {
    quotesList.innerHTML = '';
    
    if (quotes.length === 0) {
        emptyMessage.classList.remove('hidden');
    } else {
        emptyMessage.classList.add('hidden');
        
        for (var i = 0; i < quotes.length; i++) {
            var li = document.createElement('li');
            li.className = 'quote-item';
            
            var quoteText = document.createElement('span');
            quoteText.className = 'quote-text';
            quoteText.textContent = quotes[i];
            
            var deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-delete';
            deleteBtn.textContent = 'Remove';
            
            (function(index) {
                deleteBtn.addEventListener('click', function() {
                    quotes.splice(index, 1);
                    saveQuotes();
                    renderQuotes();
                });
            })(i);
            
            li.appendChild(quoteText);
            li.appendChild(deleteBtn);
            quotesList.appendChild(li);
        }
    }
}

function addQuote() {
    var quote = quoteInput.value.trim();
    if (quote === '') {
        alert('Please enter something to save!');
        return;
    }
    quotes.push(quote);
    saveQuotes();
    renderQuotes();
    quoteInput.value = '';
    quoteInput.focus();
}

loadQuotes();
renderQuotes();

addBtn.addEventListener('click', addQuote);

quoteInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addQuote();
    }
});
