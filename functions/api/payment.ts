export async function onRequestPost({ request }) {
  try {
    const body = await request.json();
    const { amount, method } = body;
    
    if (!amount || amount <= 0) {
      return new Response(JSON.stringify({ error: "Invalid payment amount" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (!method) {
      return new Response(JSON.stringify({ error: "Payment method is required" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Simulate calling an external secure payment gateway
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const orderId = "LR-" + Math.floor(100000 + Math.random() * 900000);
    return new Response(JSON.stringify({ success: true, orderId, method, amount }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
