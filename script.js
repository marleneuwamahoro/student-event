const eventContainer = document.getElementById("eventContainer");

const totalEvents = document.getElementById("totalEvents");

const totalRegistered = document.getElementById("totalRegistered");

const remainingSeats = document.getElementById("remainingSeats");

const eventForm = document.getElementById("eventForm");

const searchInput = document.getElementById("searchInput");
function saveToLocalStorage() {
  localStorage.setItem("events", JSON.stringify(events));
}

function renderEvents(eventList = events) {

  eventContainer.innerHTML = "";

  eventList.forEach(event => {

    const remaining = event.seats - event.registered;

    const card = document.createElement("div");

    card.className =
      "bg-white p-6 rounded shadow";

    card.innerHTML = `
      <h2 class="text-2xl font-bold mb-2">
        ${event.title}
      </h2>

      <p><strong>Category:</strong> ${event.category}</p>

      <p><strong>Total Seats:</strong> ${event.seats}</p>

      <p><strong>Registered:</strong> ${event.registered}</p>

      <p><strong>Remaining:</strong> ${remaining}</p>

      <div class="flex gap-2 mt-4">

        <button
          class="registerBtn bg-green-600 text-white px-4 py-2 rounded"
          data-id="${event.id}"
        >
          Register
        </button>

        <button
          class="cancelBtn bg-red-600 text-white px-4 py-2 rounded"
          data-id="${event.id}"
        >
          Cancel
        </button>

      </div>
    `;

    eventContainer.appendChild(card);
  });

  updateStatistics();

  addButtonEvents();
}
function updateStatistics() {

  totalEvents.textContent = events.length;

  const registeredStudents = events.reduce((total, event) => {
    return total + event.registered;
  }, 0);

  totalRegistered.textContent = registeredStudents;

  const remaining = events.reduce((total, event) => {
    return total + (event.seats - event.registered);
  }, 0);

  remainingSeats.textContent = remaining;
}
function addButtonEvents() {

  const registerButtons =
    document.querySelectorAll(".registerBtn");

  registerButtons.forEach(button => {

    button.addEventListener("click", () => {

      const id = Number(button.dataset.id);

      const event = events.find(e => e.id === id);

      if (event.registered < event.seats) {

        event.registered++;

        saveToLocalStorage();

        renderEvents();

      } else {
        alert("No seats available!");
      }

    });

  });

  const cancelButtons =
    document.querySelectorAll(".cancelBtn");

  cancelButtons.forEach(button => {

    button.addEventListener("click", () => {

      const id = Number(button.dataset.id);

      const event = events.find(e => e.id === id);

      if (event.registered > 0) {

        event.registered--;

        saveToLocalStorage();

        renderEvents();
      }

    });

  });
}
eventForm.addEventListener("submit", function(e) {

  e.preventDefault();

  const title =
    document.getElementById("title").value.trim();

  const category =
    document.getElementById("category").value.trim();

  const seats =
    Number(document.getElementById("seats").value);

  if (!title || !category || seats <= 0) {
    alert("Please fill all fields correctly");
    return;
  }

  const newEvent = {
    id: Date.now(),
    title,
    category,
    seats,
    registered: 0
  };

  events.push(newEvent);

  saveToLocalStorage();

  renderEvents();

  eventForm.reset();
});
searchInput.addEventListener("input", () => {

  const value =
    searchInput.value.toLowerCase();

  const filteredEvents = events.filter(event => {

    return event.title
      .toLowerCase()
      .includes(value);

  });

  renderEvents(filteredEvents);
});