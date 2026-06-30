export async function onRequestGet() {
  const meds = [
    { id: 101, name: "Amoxicillin", dosage: "500mg", frequency: "3 times a day", status: "Active", nextRefill: "2024-06-25" },
    { id: 102, name: "Lisinopril", dosage: "10mg", frequency: "Once daily", status: "Active", nextRefill: "2024-07-10" },
    { id: 103, name: "Ibuprofen", dosage: "400mg", frequency: "As needed", status: "As Needed", nextRefill: "N/A" },
  ];
  return new Response(JSON.stringify(meds), {
    headers: { 'Content-Type': 'application/json' }
  });
}
