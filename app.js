let clinicId = localStorage.getItem("clinicId");

async function login(){
  const email = document.getElementById("email").value;

  const res = await fetch("/api/login", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ email })
  });

  const data = await res.json();

  localStorage.setItem("clinicId", data.clinicId);

  document.getElementById("msg").innerText = "Logged in ✔";

  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 800);
}

async function book(){
  const data = {
    name: name.value,
    phone: phone.value,
    date: date.value
  };

  await fetch(`/api/${clinicId}/book`, {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify(data)
  });

  alert("Appointment booked ✔");
  load();
}

async function load(){
  const res = await fetch(`/api/${clinicId}`);
  const data = await res.json();

  document.getElementById("info").innerHTML =
    `<div class="card">Clinic: ${data.email}</div>`;

  document.getElementById("list").innerHTML =
    data.appointments.map(a => `
      <div class="card">
        ${a.name} - ${a.phone} - ${a.date}
      </div>
    `).join("");
}

if(window.location.pathname.includes("dashboard")){
  load();
}
