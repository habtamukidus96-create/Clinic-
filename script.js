/* APPOINTMENT SYSTEM */
const form = document.getElementById("appointmentForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: form.name.value,
    phone: form.phone.value,
    service: form.service.value,
    date: form.date.value
  };

  const res = await fetch("/api/appointment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  alert(result.message);
});

/* AI CHATBOT */
const chatInput = document.getElementById("chatInput");
const chatBox = document.getElementById("chatBox");

chatInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const msg = chatInput.value;

    chatBox.innerHTML += `<div><b>You:</b> ${msg}</div>`;

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg })
    });

    const data = await res.json();

    chatBox.innerHTML += `<div><b>AI:</b> ${data.reply}</div>`;
    chatInput.value = "";
  }
});
