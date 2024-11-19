let cardCount = 0;

        function addCardField() {
            const cardList = document.getElementById('cardList');
            const cardDiv = document.createElement('div');
            cardDiv.className = 'flex gap-4 items-start bg-gray-50 p-4 rounded-lg';
            cardDiv.innerHTML = `
                <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Card Name</label>
                    <input 
                        type="text" 
                        name="cards[${cardCount}][name]" 
                        placeholder="Enter card name" 
                        required 
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 border"
                    >
                </div>
                <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Card Type</label>
                    <select 
                        name="cards[${cardCount}][type]" 
                        required 
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 border bg-white"
                    >
                        <option value="">Select Type</option>
                        <option value="monster">Grass</option>
                        <option value="spell">Fire</option>
                        <option value="trap">Electric</option>
                        <option value="trap">Water</option>
                        <option value="trap">Psychic</option>
                        <option value="trap">Fighter</option>
                        <option value="trap">Dark</option>
                        <option value="trap">Steel</option>
                        <option value="trap">Dragon</option>
                        <option value="trap">Normal</option>
                        <option value="trap">Trainer</option>
                    </select>
                </div>
                <button 
                    type="button" 
                    onclick="this.parentElement.remove()" 
                    class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-6"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                </button>
            `;
            cardList.appendChild(cardDiv);
            cardCount++;
        }

        document.getElementById('deckForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const cards = [];
            const deckName = formData.get('name');

            // Collect all card data
            for (let i = 0; i < cardCount; i++) {
                const cardName = formData.get(`cards[${i}][name]`);
                const cardType = formData.get(`cards[${i}][type]`);
                
                if (cardName && cardType) {
                    cards.push({ name: cardName, type: cardType });
                }
            }

            try {
                await fetch('/decks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: deckName,
                        cards: cards
                    })
                })
                .then(res => {
                    setTimeout(() => {
                            window.location.href = '/decks'
                        }, 2000)
                });
            } catch (error) {
                // Create error alert
                const alertDiv = document.createElement('div');
                alertDiv.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4';
                alertDiv.role = 'alert';
                alertDiv.innerHTML = `
                    <strong class="font-bold">Error!</strong>
                    <span class="block sm:inline"> ${error.message || 'Error creating deck'}</span>
                `;
                document.getElementById('deckForm').insertBefore(alertDiv, document.querySelector('button[type="submit"]'));

                // Remove alert after 5 seconds
                setTimeout(() => alertDiv.remove(), 5000);
            }
        });

        // Add initial card field
        addCardField();

        const $ = el => document.querySelector(el)
    const logoutButton = $('#close-session')

    logoutButton?.addEventListener('click', e => {
        e.preventDefault()
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
    })
