document.getElementById("executionForm")
.addEventListener("submit", function(e){

  e.preventDefault();

  const subject = subject.value;
  const chapter = chapter.value;
  const minutes = minutes.value;

  db.collection("logs").add({
    subject,
    chapter,
    minutes: Number(minutes),
    time: new Date()
  }).then(()=>{
    alert("Saved!");
    location.reload();
  });

});
