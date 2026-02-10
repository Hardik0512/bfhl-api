import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const EMAIL = "hardik0512.be23@chitkara.edu.in";

// Health API
app.get("/health", (req, res) => {
  res.json({ is_success: true, official_email: EMAIL });
});

// BFHL API
app.post("/bfhl", async (req, res) => {
  try {
    const body = req.body;

    if (body.fibonacci !== undefined) {
      let n = body.fibonacci;
      let fib = [0, 1];
      for (let i = 2; i < n; i++) fib.push(fib[i-1] + fib[i-2]);
      return res.json({ is_success: true, official_email: EMAIL, data: fib.slice(0, n) });
    }

    if (body.prime) {
      const isPrime = (n) => {
        if (n < 2) return false;
        for (let i = 2; i*i <= n; i++) if (n % i === 0) return false;
        return true;
      };
      return res.json({
        is_success: true,
        official_email: EMAIL,
        data: body.prime.filter(isPrime)
      });
    }

    if (body.lcm) {
      const gcd = (a,b) => b === 0 ? a : gcd(b, a % b);
      const lcm = body.lcm.reduce((a,b) => (a*b)/gcd(a,b));
      return res.json({ is_success: true, official_email: EMAIL, data: lcm });
    }

    if (body.hcf) {
      const gcd = (a,b) => b === 0 ? a : gcd(b, a % b);
      const hcf = body.hcf.reduce((a,b) => gcd(a,b));
      return res.json({ is_success: true, official_email: EMAIL, data: hcf });
    }

    if (body.AI) {
      const result = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_GEMINI_KEY",
        { contents: [{ parts: [{ text: body.AI }] }] }
      );

      const answer = result.data.candidates[0].content.parts[0].text.split(" ")[0];
      return res.json({ is_success: true, official_email: EMAIL, data: answer });
    }

    return res.status(400).json({ is_success: false, error: "Invalid input" });

  } catch (e) {
    res.status(500).json({ is_success: false, error: "Server error" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});

