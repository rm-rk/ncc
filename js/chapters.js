// chapters.js - FIXED
document.addEventListener('DOMContentLoaded', function() {
  // Auth check
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "index.html";
      return;
    }
    loadChapters();
  });

  const subjectInput = document.getElementById("subject");
  const chapterInput = document.getElementById("chapter");
  const addBtn = document.getElementById("addChapterBtn");
  const listDiv = document.getElementById("chapterList");

  function loadChapters() {
    db.collection("chapters")
      .where("userId", "==", auth.currentUser.uid)
      .get()
      .then(snapshot => {
        listDiv.innerHTML = "";
        snapshot.forEach(doc => {
          const d = doc.data();
          listDiv.innerHTML += `
            <div style="background:rgba(255,255,255,0.05);padding:15px;margin:10px 0;border-radius:12px;display:flex;justify-content:space-between;align-items:center;">
              <span><b>${d.subject}</b> - ${d.chapter}</span>
              <button onclick="toggleChapter('${doc.id}', ${d.completed})" 
                style="background:${d.completed ? '#10b981' : '#38bdf8'};padding:8px 16px;font-size:0.85rem;">
                ${d.completed ? "✓ Completed" : "Mark Done"}
              </button>
            </div>
          `;
        });
      });
  }

  addBtn.onclick = () => {
    if (!subjectInput.value || !chapterInput.value) {
      alert("Please fill all fields!");
      return;
    }
    
    db.collection("chapters").add({
      subject: subjectInput.value,
      chapter: chapterInput.value,
      completed: false,
      userId: auth.currentUser.uid,
      createdAt: new Date()
    }).then(() => {
      subjectInput.value = "";
      chapterInput.value = "";
      loadChapters();
    });
  };

  // Make toggle global
  window.toggleChapter = function(id, status) {
    db.collection("chapters").doc(id).update({
      completed: !status
    }).then(() => loadChapters());
  };
});
