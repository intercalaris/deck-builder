const $ = el => document.querySelector(el);

// Managing Log out
const logoutButton = $('#close-session');

logoutButton?.addEventListener('click', e => {
    e.preventDefault();
    fetch('/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            console.log(res)
            window.location.href = '/'
        })
});

// Handle deck deletion
document.addEventListener('click', e => {
    const deleteButton = e.target.closest('button[type="submit"]');
    if (!deleteButton || !deleteButton.closest('form[action^="/decks/"]')) return
    
    e.preventDefault();
    const form = deleteButton.closest('form');
    const deckId = form.action.split('/decks/')[1].split('?')[0];
    
    if (confirm('Are you sure you want to delete this deck?')) {
        fetch(`/decks/${deckId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) {
                    // Remove the deck card from the UI
                    const deckCard = form.closest('.bg-white.rounded-lg');
                    deckCard.remove();
                } else {
                    throw new Error('Failed to delete deck');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to delete deck');
            })
    }
});