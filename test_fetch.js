const url = "api.example.com";
try {
  fetch(url).catch(e => console.log("Caught:", e.message));
} catch(e) {
  console.log("Sync caught:", e.message);
}
