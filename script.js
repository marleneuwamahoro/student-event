// ===============================
// EVENTS DATA (with localStorage)
// ===============================

// Get saved events from localStorage
// If none exist, use default array
let events = JSON.parse(localStorage.getItem("events")) || [
  {
    id: 1,
    title: "AI Bootcamp",
    category: "Technology",
    seats: 30,
    registered: 10
  }
];


// ===============================
// CONNECT HTML ELEMENTS TO JS
// ===============================

// Container where event cards will be displayed
const eventContainer = document.getElementById("eventContainer");

// Dashboard stats elements
const totalEvents = document.getElementById("totalEvents");
const totalRegistered = document.getElementById("totalRegistered");
const remainingSeats = document.getElementById("remainingSeats");
const category = document.getElementById("category").value.trim();

// Form for adding new events
const eventForm = document.getElementById("eventForm");

// Search input field
const searchInput = document.getElementById("searchInput");


// ===============================
// SAVE DATA TO LOCALSTORAGE
// ===============================

function saveToLocalStorage() {
  // Convert JS array → JSON string and save in browser
  localStorage.setItem("events", JSON.stringify(events));
}




function renderEvents(eventList = events) {

  eventContainer.innerHTML = "";


  eventList.forEach(event => {

    // Calculate remaining seats
    const remaining = event.seats - event.registered;

    // Create a new div element for event card
    const card = document.createElement("div");

    
    card.className = "bg-white p-6 rounded shadow";

    card.innerHTML = `
      <h2 class="text-2xl font-bold mb-2">
        ${event.title}
      </h2>

      <p><strong>Category:</strong> ${event.category}</p>

      <p><strong>Total Seats:</strong> ${event.seats}</p>

      <p><strong>Registered:</strong> ${event.registered}</p>

      <p><strong>Remaining:</strong> ${remaining}</p>

      <div class="flex gap-2 mt-4">

        <!-- Register button with event ID -->
        <button
          class="registerBtn bg-green-600 text-white px-4 py-2 rounded"
          data-id="${event.id}"
        >
          Register
        </button>

        <!-- Cancel button with event ID -->
        <button
          class="cancelBtn bg-red-600 text-white px-4 py-2 rounded"
          data-id="${event.id}"
        >
          Cancel
        </button>

      </div>
    `;

    // Add card to page
    eventContainer.appendChild(card);
  });


  updateStatistics();

  addButtonEvents();
}



function updateStatistics() {

  // Total number of events
  totalEvents.textContent = events.length;

  // Total registered students (sum of all events)
  const registeredStudents = events.reduce((total, event) => {
    return total + event.registered;
  }, 0);

  totalRegistered.textContent = registeredStudents;

  // Total remaining seats (all events combined)
  const remaining = events.reduce((total, event) => {
    return total + (event.seats - event.registered);
  }, 0);

  remainingSeats.textContent = remaining;
}



function addButtonEvents() {

  // Select all register buttons
  const registerButtons = document.querySelectorAll(".registerBtn");

  registerButtons.forEach(button => {

    button.addEventListener("click", () => {

      // Get event ID from button
      const id = Number(button.dataset.id);

      // Find event in array
      const event = events.find(e => e.id === id);

      // Check if seats are available
      if (event.registered < event.seats) {

        // Increase registered count
        event.registered++;

        // Save changes
        saveToLocalStorage();

        // Re-render UI
        renderEvents();

      } else {
        alert("No seats available!");
      }

    });

  });

  // Select all cancel buttons
  const cancelButtons = document.querySelectorAll(".cancelBtn");

  cancelButtons.forEach(button => {

    button.addEventListener("click", () => {

      // Get event ID
      const id = Number(button.dataset.id);

      // Find event
      const event = events.find(e => e.id === id);

      // Only cancel if registered > 0
      if (event.registered > 0) {

        // Decrease registration
        event.registered--;

        // Save changes
        saveToLocalStorage();

        // Update UI
        renderEvents();
      }

    });

  });
}


// ===============================
// ADD NEW EVENT (FORM SUBMIT)
// ===============================

eventForm.addEventListener("submit", function(e) {

  // Stop page reload
  e.preventDefault();

  // Get input values
  const title = document.getElementById("title").value.trim();
  const category = document.getElementById("category").value.trim();
  const seats = Number(document.getElementById("seats").value);

  // Validate inputs
  if (!title || !category || seats <= 0) {
    alert("Please fill all fields correctly");
    return;
  }

  // Create new event object
  const newEvent = {
    id: Date.now(), // unique ID
    title,
    category,
    seats,
    registered: 0
  };

  // Add event to array
  events.push(newEvent);

  // Save to localStorage
  saveToLocalStorage();

  // Re-render UI
  renderEvents();

  // Reset form
  eventForm.reset();
});


// ===============================
// SEARCH FUNCTIONALITY
// ===============================

searchInput.addEventListener("input", () => {

  const value = searchInput.value.toLowerCase();

  const filteredEvents = events.filter(event => {

    return (
      event.title.toLowerCase().includes(value) ||
      event.category.toLowerCase().includes(value)
    );

  });

  renderEvents(filteredEvents);
});

// ===============================
// INITIAL LOAD
// ===============================

// Show events when page loads
renderEvents();