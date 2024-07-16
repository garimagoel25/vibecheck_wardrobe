document.addEventListener('DOMContentLoaded', () => {
    const wardrobeData = {
        sam: [
            { src: 'path/to/sams-clothing1.jpg', name: 'Red Shirt' },
            { src: 'path/to/sams-clothing2.jpg', name: 'Blue Jeans' }
        ],
        jenny: [
            { src: 'path/to/jennys-clothing1.jpg', name: 'Yellow Dress' },
            { src: 'path/to/jennys-clothing2.jpg', name: 'Green Skirt' }
        ]
        // Add more wardrobe data as needed
    };

    const leaderboardData = [
        { name: 'Sam', points: 150 },
        { name: 'Jenny', points: 120 }
        // Add more leaderboard data as needed
    ];

    function showWardrobe(owner) {
        const wardrobeOwner = document.getElementById('wardrobe-owner');
        const wardrobeItems = document.getElementById('wardrobe-items');

        wardrobeOwner.innerText = ${capitalizeFirstLetter(owner)}'s Wardrobe;
        wardrobeItems.innerHTML = '';

        wardrobeData[owner].forEach(item => {
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.name;
            wardrobeItems.appendChild(img);
        });
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function likeItem() {
        alert('Item liked!');
    }

    function loadLeaderboard() {
        const leaderboardList = document.getElementById('leaderboard-list');
        leaderboardData.forEach(entry => {
            const li = document.createElement('li');
            li.innerText = ${entry.name} - ${entry.points} points;
            leaderboardList.appendChild(li);
        });
    }

    // Initial load
    showWardrobe('sam');
    loadLeaderboard();
});