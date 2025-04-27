document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".nav-btn");
  const hamburger = document.querySelector(".hamburger");
  const navMobileContainer = document.querySelector(".nav-mobile-container");

  // Get the current page filename only
  const currentPage =
    window.location.pathname.split("/").pop() || "booking.html";
  console.log("Current page:", currentPage); // Debug log

  // First, remove any existing active classes
  buttons.forEach((button) => {
    button.classList.remove("active");
  });

  // Set active state based on exact page match
  if (currentPage === "booking.html") {
    document.getElementById("hotels").classList.add("active");
  } else if (currentPage === "flights.html") {
    document.getElementById("flights").classList.add("active");
  } else if (currentPage === "carrental.html") {
    document.getElementById("car-hire").classList.add("active");
  }

  // Button click handlers
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      buttons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Page navigation
      const pages = {
        flights: "flights.html",
        hotels: "booking.html",
        "car-hire": "carrental.html",
      };
      window.location.href = pages[this.id] || "#";
    });
  });

  // Hamburger menu toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMobileContainer.classList.toggle("active");
  });

  // Close menu on outside click
  document.addEventListener("click", (event) => {
    if (
      !navMobileContainer.contains(event.target) &&
      !hamburger.contains(event.target)
    ) {
      hamburger.classList.remove("active");
      navMobileContainer.classList.remove("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.querySelector(".auth-btn.logout");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      // Clear authentication data (if stored in localStorage)
      localStorage.removeItem("authUser");

      // Redirect to index.html
      window.location.href = "index.html";
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let user = localStorage.getItem("user");

  if (user) {
      user = JSON.parse(user);
      document.getElementById("userName").innerHTML = `<i class="ri-user-3-fill"></i> ${user.name}`;
      
      document.getElementById("userSection").addEventListener("click", function () {
          let logoutConfirm = confirm("Do you want to log out?");
          if (logoutConfirm) {
              localStorage.removeItem("user");
              window.location.reload();
          }
      });
  } else {
      document.getElementById("userSection").addEventListener("click", function () {
          window.location.href = "login.html";
      });
  }});



  // popular Destinations Grid

const destinations = [
  // Initial 12 destinations
  {
      name: 'Prayagraj',
      image: 'https://media.istockphoto.com/id/458237899/photo/kumbh-mela-in-haridwar.jpg?s=612x612&w=0&k=20&c=PkjlCGNP0BgGslwoi1jF5IhdX7TsVPQ7taiKOvhmEgU=',
      hotelTypes: ['Hotels', 'Budget Hotels', '3 Star Hotels', '4 Star Hotels', '5 Star Hotels']
  },
  {
      name: 'Goa',
      image: 'https://images.emtcontent.com/hotel-img/goa-sm.webp',
      hotelTypes: ['Hotels', 'Budget Hotels', '3 Star Hotels', '4 Star Hotels', '5 Star Hotels']
  },
  {
      name: 'Mumbai',
      image: 'https://images.emtcontent.com/hotel-img/mumb-sm.webp',
      hotelTypes: ['Hotels', 'Budget Hotels', '3 Star Hotels', '4 Star Hotels', '5 Star Hotels']
  },
  {
      name: 'Shimla',
      image: 'https://images.emtcontent.com/hotel-img/shimla-sm.webp',
      hotelTypes: ['Hotels', 'Budget Hotels', '3 Star Hotels', '4 Star Hotels', '5 Star Hotels']
  },
  {
      name: 'Manali',
      image: 'https://images.emtcontent.com/hotel-img/manali-sm.webp',
      hotelTypes: ['Hotels', 'Budget Hotels', '3 Star Hotels', '4 Star Hotels', '5 Star Hotels']
  },
  {
      name: 'Ayodhya',
      image: 'https://bharattravelguru.com/wp-content/uploads/2024/02/Ayodhya-Ram-Mandir-Opening.jpg',
      hotelTypes: ['Hotels', 'Budget Hotels', '3 Star Hotels', '4 Star Hotels', '5 Star Hotels']
  },
  {
      name: 'Chennai',
      image: 'https://images.emtcontent.com/hotel-img/chennai-sm.webp',
      hotelTypes: ['Hotels', 'Budget Hotels', '3 Star Hotels', '4 Star Hotels', '5 Star Hotels']
  },
  {
      name: 'Kolkata',
      image: 'https://images.emtcontent.com/hotel-img/kolkata-sm.webp',
      hotelTypes: ['Hotels', 'Budget Hotels', '3 Star Hotels', '4 Star Hotels', '5 Star Hotels']
  },
  {
      name: 'Jaipur',
      image: 'https://images.emtcontent.com/hotel-img/jaipur-sm.webp',
      hotelTypes: ['Hotels', 'Budget Hotels', '3 Star Hotels', '4 Star Hotels', '5 Star Hotels']
  },
  {
      name: 'Pune',
      image: 'https://images.emtcontent.com/hotel-img/pune-sm.webp',
      hotelTypes: ['Hotels', 'Budget Hotels', '3 Star Hotels', '4 Star Hotels', '5 Star Hotels']
  },
  {
      name: 'Gurugram',
      image: 'https://images.emtcontent.com/hotel-img/gurgrm-sm.webp',
      hotelTypes: ['Hotels', 'Budget Hotels', '3 Star Hotels', '4 Star Hotels', '5 Star Hotels']
  },
  {
      name: 'Ahmedabad',
      image: 'https://images.emtcontent.com/hotel-img/ahmd-sm.webp',
      hotelTypes: ['Hotels', 'Budget Hotels', '3 Star Hotels', '4 Star Hotels', '5 Star Hotels']
  },
  // Additional destinations that will be shown after clicking "View More"
  {
      name: 'Lucknow',
      image: 'https://images.emtcontent.com/hotel-img/lkcnw-sm.webp',
      hotelTypes: ['Hotels', 'Budget Hotels', '3 Star Hotels', '4 Star Hotels', '5 Star Hotels']
  },
  {
      name: 'Udaipur',
      image: 'https://images.emtcontent.com/hotel-img/udr-sm.webp',
      hotelTypes: ['Hotels', 'Budget Hotels', '3 Star Hotels', '4 Star Hotels', '5 Star Hotels']
  },
  {
      name: 'Varanasi',
      image: 'https://images.emtcontent.com/hotel-img/varn-sm.webp',
      hotelTypes: ['Hotels', 'Budget Hotels', '3 Star Hotels', '4 Star Hotels', '5 Star Hotels']
  },
  {
      name: 'Agra',
      image: 'https://images.emtcontent.com/hotel-img/agra-sm.webp',
      hotelTypes: ['Hotels', 'Budget Hotels', '3 Star Hotels', '4 Star Hotels', '5 Star Hotels']
  }
];

const ITEMS_PER_PAGE = 12;
let currentlyShown = ITEMS_PER_PAGE;

function createDestinationCard(destination) {
  return `
      <div class="destination-card">
          <img src="${destination.image}" alt="${destination.name}" class="destination-image">
          <div class="destination-info">
              <div class="destination-name">${destination.name}</div>
              <div class="hotel-types">${destination.hotelTypes.join(', ')}</div>
          </div>
      </div>
  `;
}

function renderDestinations(count = ITEMS_PER_PAGE) {
  const destinationsGrid = document.getElementById('destinationsGrid');
  destinationsGrid.innerHTML = destinations
      .slice(0, count)
      .map(destination => createDestinationCard(destination))
      .join('');
  
  // Hide "View More" button if all destinations are shown
  const viewMoreBtn = document.getElementById('viewMoreBtn');
  if (count >= destinations.length) {
      viewMoreBtn.style.display = 'none';
  }
}

// Initialize the grid with initial items
renderDestinations();

// Add click handler for "View More" button
document.getElementById('viewMoreBtn').addEventListener('click', () => {
  currentlyShown += ITEMS_PER_PAGE;
  renderDestinations(currentlyShown);
});


