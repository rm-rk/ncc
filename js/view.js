db.collection("logs")
.orderBy("time","desc")
.onSnapshot(snapshot=>{

  const container = document.getElementById("entries");
  container.innerHTML = "";

  snapshot.forEach(doc=>{
    const d = doc.data();
    container.innerHTML += `
      <div class="list-item">
        <div>
          <b>${d.chapter}</b><br>
          ${d.subject} - ${d.minutes} min
        </div>
      </div>
    `;
  });

});
