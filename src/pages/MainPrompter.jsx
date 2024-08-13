import React, { useState } from "react";

const MainPrompter = () => {
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    const data = { companyName, industry, prompt };

    try {
      const res = await fetch("https://i0kgli5hka.execute-api.us-east-1.amazonaws.com/prod/tata-motors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const result = await res.json();
        const parsedBody = JSON.parse(result.body);
        setResponse(parsedBody.response);
      } else {
        setResponse("An error occurred while fetching the response.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponse("An error occurred while fetching the response.");
    }
  };

  return (
    <div>
      <h1>Agentic Model</h1>
      <div>
        <label>
          Company Name:
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Industry:
          <input
            type="text"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Prompt:
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <div>
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default MainPrompter;
