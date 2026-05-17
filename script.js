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