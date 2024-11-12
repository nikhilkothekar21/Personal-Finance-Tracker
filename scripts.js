const balanceEl = document.getElementById('balance');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const transactionsUl = document.getElementById('transactions');
const addTransactionBtn = document.getElementById('addTransactionBtn');

let transactions = [];

function addTransaction(description, amount, type) {
    const transaction = {
        id: Date.now(),
        description,
        amount: parseFloat(amount),
        type
    };
    transactions.push(transaction);
    updateUI();
}

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateUI();
}

function calculateBalance() {
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    return income - expenses;
}

function updateUI() {
    transactionsUl.innerHTML = '';
    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.classList.add(transaction.type === 'income' ? 'income' : 'expense');
        li.innerHTML = `
            ${transaction.description}: $${transaction.amount.toFixed(2)}
            <button onclick="deleteTransaction(${transaction.id})">x</button>
        `;
        transactionsUl.appendChild(li);
    });

    balanceEl.textContent = calculateBalance().toFixed(2);
}

addTransactionBtn.addEventListener('click', () => {
    const description = descriptionInput.value.trim();
    const amount = amountInput.value.trim();
    const type = typeSelect.value;

    if (description === '' || amount === '') {
        alert('Please enter a valid description and amount');
        return;
    }

    addTransaction(description, amount, type);

    descriptionInput.value = '';
    amountInput.value = '';
});
