/* ... كل البيانات والـFirebase كما هي ... */

/* ================== PROGRESS + CELEBRATION + MOTIVATOR ================== */
function updateProgress() {
  const md = moduleData[selectedSection];
  const total = md.type === "models" ? md.count * TASKS.length : md.items.length * TASKS.length;
  let done = 0;
  for (const k in userData) if (k.startsWith(selectedSection + "_") && userData[k]) done++;

  const pct = total ? Math.round((done / total) * 100) : 0;
  document.getElementById("progress-count").textContent = `${done} / ${total}`;
  const bar = document.getElementById("progress-bar");
  bar.style.width = `${pct}%`;
  bar.textContent = `${pct}%`;

  // عرض الدعاء كبوب أب
  const motivPopup = document.getElementById("motivator-popup");
  const dua = DUAS[Math.floor(Math.random() * DUAS.length)].text;
  motivPopup.innerText = `${dua}\n\nجروب المشتركين للتدريب مبسوط بانجازكم`;
  motivPopup.classList.add("show");
  setTimeout(() => motivPopup.classList.remove("show"), 2500);

  const moduleContainer = document.getElementById("content");

  if (done === total && !completedSections[selectedSection]) {
    completedSections[selectedSection] = true;
    moduleContainer.querySelectorAll(".model-title").forEach(div => {
      div.classList.add("scale-effect");
      setTimeout(() => div.classList.remove("scale-effect"), 500);
    });

    showCelebration(`🎉 تم إنهاء محور ${selectedSection}!`);
  } else if (done < total) delete completedSections[selectedSection];

  saveUserData();
}
