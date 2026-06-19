function scrollToAppointment() {
  document.getElementById("appointment").scrollIntoView({ behavior: "smooth" });
}

function bookAppointment(e) {
  e.preventDefault();
  document.getElementById("msg").innerText =
    "✅ Appointment submitted successfully! We will contact you soon.";
}

/* CHATBOT */
const chatBox = document.getElementById("chat-box");
const input = document.getElementById("userInput");

function toggleChat() {
  const chat = document.getElementById("chatbot");
  chat.style.display = chat.style.display === "flex" ? "none" : "flex";
}

/* simple AI logic */
input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    let msg = input.value;
    chatBox.innerHTML += "<div><b>You:</b> " + msg + "</div>";

    let reply = getReply(msg.toLowerCase());

    setTimeout(() => {
      chatBox.innerHTML += "<div><b>AI:</b> " + reply + "</div>";
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);

    input.value = "";
  }
});

function getReply(msg) {
  if (msg.includes("hello")) return "Hello 👋 Welcome to Mercy Care Clinic!";
  if (msg.includes("doctor")) return "We have general, dental, and pediatric specialists.";
  if (msg.includes("book")) return "Go to appointment section to book easily.";
  if (msg.includes("price")) return "Consultation starts from affordable rates.";
  if (msg.includes("emergency")) return "Call +251 911 000 000 immediately.";
  return "I can help with appointments, doctors, and clinic info.";
}
