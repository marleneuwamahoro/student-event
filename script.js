const eventContainer = document.getElementById("eventContainer");

const totalEvents = document.getElementById("totalEvents");

const totalRegistered = document.getElementById("totalRegistered");

const remainingSeats = document.getElementById("remainingSeats");

const eventForm = document.getElementById("eventForm");

const searchInput = document.getElementById("searchInput");
function saveToLocalStorage() {
  localStorage.setItem("events", JSON.stringify(events));
}