// 🔥 SAME CONFIG AS execution.js
const firebaseConfig = {
  apiKey: "AIzaSyCrlP360Fpx-9tCyggJeoqLgkwnTlRTJ5o",
  authDomain: "ncc-project-3b0f1.firebaseapp.com",
  projectId: "ncc-project-3b0f1",
  storageBucket: "ncc-project-3b0f1.firebasestorage.app",
  messagingSenderId: "590441541895",
  appId: "1:590441541895:web:2a861830fcb60f09f655a2"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

// Elements
const logsDiv = document.getElementById("logs");
const totalTimeEl = document.getElementById("totalTime");
const subjectTotalsDiv = document.getElementById("subjectTotals");
const compareBox = document.getElementById("compareBox");
const streakBox = document.getElementById("streakBox");
const weeklyBox = document.getElementById("weeklyBox");

// Variables
let totalMinutes = 0;
let subjectMap = {};
let todayTotal = 0;
let yesterdayTotal = 0;
let dateSet = new Set();

let thisWeekTotal = 0;
let lastWeekTotal = 0;

// Dates
const today = new Date().toDateString();
const yesterday = new Date(Date.now() - 86400000).toDateString();

const now = new Date();
const weekStart = new Date(now);
weekStart.setDate(now.getDate() - now.getDay());

const lastWeekStart = new Date(weekStart);
lastWeekStart.setDate(weekStart.getDate() - 7);

const lastWeekEnd = new Date(weekStart);

// Fetch Data
db.collection("dailyEntries").get()
.then(snapshot => {

  snapshot.forEach(doc => {

    const d = doc.data();
    const mins = Number(d.time);
    const entryDate = new Date(d.created);
    const dateStr = entryDate.toDateString();

    // Total minutes
    totalMinutes += mins;

    // Subject totals
    if(subjectMap[d.subject]){
      subjectMap[d.subject] += mins;
    } else {
      subjectMap[d.subject] = mins;
    }

    // Date tracking
    dateSet.add(dateStr);

    if(dateStr === today) todayTotal += mins;
    if(dateStr === yesterday) yesterdayTotal += mins;

    // Weekly totals
    if(entryDate >= weekStart){
      thisWeekTotal += mins;
    }
    else if(entryDate >= lastWeekStart && entryDate < lastWeekEnd){
      lastWeekTotal += mins;
    }

    // Show logs
    logsDiv.innerHTML += `
      <p><b>${d.subject}</b> - ${d.chapter} - ${mins} min</p>
    `;

  });

  // TOTAL TODAY
  totalTimeEl.innerText = "Total Today: " + totalMinutes + " min";

  // SUBJECT TOTALS
  subjectTotalsDiv.innerHTML = "<h3>Subject Totals</h3>";
  for(let s in subjectMap){
    subjectTotalsDiv.innerHTML += `<p>${s}: ${subjectMap[s]} min</p>`;
  }

  // TODAY vs YESTERDAY
  compareBox.innerHTML = `
    <h3>Daily Progress</h3>
    <p>Today: ${todayTotal} min</p>
    <p>Yesterday: ${yesterdayTotal} min</p>
    <p>Difference: ${todayTotal - yesterdayTotal} min</p>
  `;

  // 🔥 STREAK
  let streak = 0;
  let check = new Date();

  while(true){
    const dStr = check.toDateString();
    if(dateSet.has(dStr)){
      streak++;
      check.setDate(check.getDate()-1);
    } else break;
  }

  streakBox.innerText = "🔥 Streak: " + streak + " days";

  // 🔥 WEEKLY SUMMARY
  weeklyBox.innerHTML = `
    <h3>Weekly Summary</h3>
    <p>This Week: ${thisWeekTotal} min</p>
    <p>Last Week: ${lastWeekTotal} min</p>
    <p>Change: ${thisWeekTotal - lastWeekTotal} min</p>
  `;

});
