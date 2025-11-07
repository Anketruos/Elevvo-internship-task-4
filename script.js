// Sample cat data for adoption
const cats = [
    {
        id: 1,
        name: "Luna",
        category: "kitten",
        image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "Sweet Luna is a curious little explorer with beautiful blue eyes.",
        age: "3 months",
        gender: "Female"
    },
    {
        id: 2,
        name: "Oliver",
        category: "adult",
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "Oliver is a gentle giant with a heart of gold.",
        age: "2 years",
        gender: "Male"
    },
    {
        id: 3,
        name: "Bella",
        category: "kitten",
        image: "kitten-1.1.jpg",
        description: "Beautiful Bella has a luxurious coat and playful personality.",
        age: "4 months",
        gender: "Female"
    },
    {
        id: 4,
        name: "Simba",
        category: "kitten",
        image: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "Little Simba is full of energy and mischief!",
        age: "4 months",
        gender: "Male"
    },
    {
        id: 5,
        name: "Misty",
        category: "senior",
        image: "cat 3.jpg",
        description: "Sweet Misty is a wise senior lady looking for a peaceful home.",
        age: "3 years",
        gender: "Female"
    },
    {
        id: 6,
        name: "Whiskers",
        category: "adult",
        image: "cat-2.1.jpg",
        description: "Whiskers is a special cat with an incredible spirit.",
        age: "5 years",
        gender: "Male"
    }
];

// DOM Elements
const blogPostsContainer = document.getElementById('blog-posts');
const categoryFilter = document.getElementById('category-filter');
const searchInput = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.filter-btn');

// Current filter state
let currentCategory = 'all';
let currentSearchTerm = '';

// Function to render cat cards
function renderCats() {
    // Clear current cards
    blogPostsContainer.innerHTML = '';

    // Filter cats based on category and search term
    const filteredCats = cats.filter(cat => {
        const matchesCategory = currentCategory === 'all' || cat.category.toLowerCase() === currentCategory.toLowerCase();
        const matchesSearch = cat.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) || 
                             cat.description.toLowerCase().includes(currentSearchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Display message if no cats match
    if (filteredCats.length === 0) {
        blogPostsContainer.innerHTML = `
            <div class="no-results">
                <h3>No cats found</h3>
                <p>Try adjusting your search or filter settings</p>
            </div>
        `;
        return;
    }

    // Create and append cat cards
    filteredCats.forEach(cat => {
        const catCard = document.createElement('div');
        catCard.className = 'post-card';
        catCard.innerHTML = `
            <img src="${cat.image}" alt="${cat.name}" class="post-image">
            <div class="post-content">
                <span class="post-category">${cat.category.charAt(0).toUpperCase() + cat.category.slice(1)}</span>
                <h2 class="post-title">${cat.name}</h2>
                <p class="post-excerpt">${cat.description}</p>
                <div class="post-meta">
                    <span>${cat.age} • ${cat.gender}</span>
                    <button class="adopt-btn">Adopt Me</button>
                </div>
            </div>
        `;
        blogPostsContainer.appendChild(catCard);
    });
    
    // Add event listeners to adopt buttons
    document.querySelectorAll('.adopt-btn').forEach(button => {
        button.addEventListener('click', function() {
            const catName = this.closest('.post-card').querySelector('.post-title').textContent;
            alert(`Thank you for your interest in adopting ${catName}! We'll contact you soon.`);
        });
    });
}

// Event listeners for category filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update current category and re-render
        currentCategory = button.getAttribute('data-category');
        renderCats();
    });
});

// Event listener for search input
searchInput.addEventListener('input', () => {
    currentSearchTerm = searchInput.value;
    renderCats();
});

// Initial render
renderCats();
