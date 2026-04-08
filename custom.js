document.addEventListener("DOMContentLoaded", function () {

let allPatients = [];
const limit = 5;
let expanded = false;

fetch('https://randomuser.me/api/?results=50')
.then(res => res.json())
.then(data => {
    allPatients = data.results;
    renderPatients();
})
.catch(err => console.log(err));


function renderPatients() {
    const container = document.getElementById('patients-container');
    const button = document.querySelector('.btn-2');

    container.innerHTML = "";

    if (!expanded) {
        allPatients.slice(0, limit).forEach(p => createCard(p, container));
        button.innerText = "See all";
    } else {
        allPatients.forEach(p => createCard(p, container));
        button.innerText = "See less";
    }
}

window.showPatients = function () {
    expanded = !expanded;
    renderPatients();
};

function createCard(patient, container) {
    const card = document.createElement('div');

    card.className = 'patient-card d-flex flex-column gap-2 align-items-center p-2';

    card.innerHTML = `
        <figure>
            <img src="${patient.picture.medium}" alt="">
        </figure>
        <h6>${patient.name.first} ${patient.name.last}</h6>
    `;

    container.appendChild(card);
}

});
function openPopup() {
    document.getElementById('popup-overlay').classList.add('active');
    const firstOtp = document.querySelector('.otp-input');
    if (firstOtp) {
        setTimeout(() => firstOtp.focus(), 50);
    }
}

function closPopup() {
    document.getElementById('forgot-overlay').classList.remove('active');
    document.querySelectorAll('.otp-input').forEach(input => input.value = '');
}

function opnPopup() {
    document.getElementById('forgot-overlay').classList.add('active');
    const firstOtp = document.querySelector('.otp-input');
    if (firstOtp) {
        // wait a tick so overlay is rendered and focus works
        setTimeout(() => firstOtp.focus(), 50);
    }
}

function closePopup() {
    document.getElementById('popup-overlay').classList.remove('active');
    document.querySelectorAll('.otp-input').forEach(input => input.value = '');
}

function setupOtpInputs() {
    const otpInputs = Array.from(document.querySelectorAll('.otp-input'));
    if (!otpInputs.length) return;

    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (event) => {
            const value = event.target.value.replace(/[^0-9]/g, '');
            event.target.value = value;
            if (value && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', (event) => {
            if (event.key === 'Backspace' && !event.target.value && index > 0) {
                otpInputs[index - 1].focus();
            }
            if (event.key === 'ArrowLeft' && index > 0) {
                otpInputs[index - 1].focus();
                event.preventDefault();
            }
            if (event.key === 'ArrowRight' && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
                event.preventDefault();
            }
        });
    });
}
// initialize OTP behaviors when DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupOtpInputs);
} else {
    setupOtpInputs();
}

// 1.9 FAQ Section JS //
function toggleFAQ(element) {
  const allItems = document.querySelectorAll(".faq-item");

  allItems.forEach((item) => {
    const answer = item.querySelector(".answer");
    const icon = item.querySelector(".icon");

    if (item !== element) {
      answer.classList.add("d-none");
      icon.innerHTML = "+";
    }
  });

  const answer = element.querySelector(".answer");
  const icon = element.querySelector(".icon");

  if (answer.classList.contains("d-none")) {
    answer.classList.remove("d-none");
    icon.innerHTML = "✕";
  } else {
    answer.classList.add("d-none");
    icon.innerHTML = "+";
  }
}
document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("click", () => {
    const content = item.querySelector("p");
    const icon = item.querySelector("span");
    const isOpen = !content.classList.contains("d-none");

    document.querySelectorAll(".faq-item p").forEach((h) => {
      h.classList.add("d-none");
    });
    document.querySelectorAll(".faq-item span").forEach((s) => {
      s.textContent = "+";
    });

    if (!isOpen) {
      content.classList.remove("d-none");
      icon.textContent = "✕";
    }
  });
});

// 1.4 Specialization //
  function selectSpecial(type) {
    alert("Selected: " + type);
  }

  function viewAll() {
    alert("Showing all specialisations...");
  }
//   1.5 Families //
 const counters = document.querySelectorAll(".counter");

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;

      const increment = target / 100;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target + "+";
      }
    };

    updateCount();
  });