document.addEventListener("DOMContentLoaded", function () {
    const diaryEntryInput = document.getElementById("diary-entry");
    const saveButton = document.getElementById("save-button");
    const entryList = document.getElementById("entry-list");

    // Function to add a new diary entry to the UI
    function addDiaryEntry(entryText, entryId) {
        const li = document.createElement("li");
        li.innerHTML = `
            <p>${entryText}</p>
            <div class="entry-actions">
                <button class="edit-button" data-id="${entryId}">Edit</button>
                <button class="delete-button" data-id="${entryId}">Delete</button>
            </div>
        `;
        entryList.appendChild(li);
        diaryEntryInput.value = ""; // Clear the input
    }

    // Function to load diary entries from the API
    function loadDiaryEntries() {
        // Send a GET request to the API to retrieve diary entries
        // Example: fetch('your-api-endpoint')
        //     .then(response => response.json())
        //     .then(data => {
        //         data.forEach(entry => addDiaryEntry(entry.text, entry.id));
        //     })
        //     .catch(error => console.error(error));
    }

    // Event listener for the save button (Create new entry)
    saveButton.addEventListener("click", function () {
        const entryText = diaryEntryInput.value.trim();
        if (entryText !== "") {
            // Send a POST request to the API to create a new diary entry
            // Example: fetch('your-api-endpoint', { method: 'POST', body: JSON.stringify({ text: entryText }) })
            
            // Simulate API response for demonstration
            const fakeEntryId = Math.random().toString(36).substring(7);
            addDiaryEntry(entryText, fakeEntryId);
        }
    });

    // Event delegation for edit and delete buttons
    entryList.addEventListener("click", function (event) {
        const target = event.target;
        if (target.classList.contains("edit-button")) {
            // Handle edit action (you need to implement the edit functionality)
            const entryId = target.getAttribute("data-id");
            const entryTextElement = target.parentElement.previousElementSibling;
            const entryText = entryTextElement.textContent;
            const updatedText = prompt("Edit your diary entry:", entryText);
            if (updatedText !== null) {
                // Send a PUT request to the API to update the entry with entryId
                // Example: fetch(`your-api-endpoint/${entryId}`, { method: 'PUT', body: JSON.stringify({ text: updatedText }) })
                
                // Update the entry text in the UI
                entryTextElement.textContent = updatedText;
            }
        } else if (target.classList.contains("delete-button")) {
            // Handle delete action (you need to implement the delete functionality)
            const entryId = target.getAttribute("data-id");
            if (confirm("Are you sure you want to delete this entry?")) {
                // Send a DELETE request to the API to delete the entry with entryId
                // Example: fetch(`your-api-endpoint/${entryId}`, { method: 'DELETE' })
                // Remove the entry from the UI
                target.parentElement.parentElement.remove();
            }
        }
    });
    
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

// Function to filter and display diary entries based on search
function searchDiaryEntries() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const entries = document.querySelectorAll("#entry-list li");

    entries.forEach(entry => {
        const text = entry.querySelector("p").textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            entry.style.display = "block";
        } else {
            entry.style.display = "none";
        }
    });
}

// Event listener for the search button
searchButton.addEventListener("click", searchDiaryEntries);

// Event listener for the input field (trigger search on Enter key press)
searchInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        searchDiaryEntries();
    }
});

    // Load diary entries when the page loads
    loadDiaryEntries();
});