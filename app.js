const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home route
app.get('/', (req, res) => {
  res.send(`
    <h1>CareConnect</h1>
    <p>A healthcare appointment and symptom triage application.</p>
    <p>This application is used to demonstrate a Jenkins-based DevOps CI/CD pipeline.</p>
    <ul>
      <li>Patient symptom submission</li>
      <li>Basic triage categorisation</li>
      <li>Appointment request support</li>
      <li>Health-check monitoring endpoint</li>
    </ul>
  `);
});

// Health check endpoint for monitoring
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'CareConnect Healthcare App',
    timestamp: new Date().toISOString()
  });
});

// Simple symptom triage logic
function triageSymptoms(symptoms) {
  const text = symptoms.toLowerCase();

  if (
    text.includes('chest pain') ||
    text.includes('breathing difficulty') ||
    text.includes('severe bleeding') ||
    text.includes('unconscious')
  ) {
    return 'High Priority';
  }

  if (
    text.includes('fever') ||
    text.includes('rash') ||
    text.includes('persistent pain') ||
    text.includes('vomiting')
  ) {
    return 'Medium Priority';
  }

  return 'Low Priority';
}

// API endpoint for symptom submission
app.post('/triage', (req, res) => {
  const { name, symptoms } = req.body;

  if (!name || !symptoms) {
    return res.status(400).json({
      error: 'Patient name and symptoms are required.'
    });
  }

  const priority = triageSymptoms(symptoms);

  return res.status(200).json({
    patient: name,
    symptoms,
    triagePriority: priority,
    message: 'Symptom request received. Please consult a healthcare professional for clinical advice.'
  });
});

// API endpoint for appointment request
app.post('/appointment', (req, res) => {
  const { name, preferredDate, reason } = req.body;

  if (!name || !preferredDate || !reason) {
    return res.status(400).json({
      error: 'Patient name, preferred date, and reason are required.'
    });
  }

  return res.status(201).json({
    patient: name,
    preferredDate,
    reason,
    status: 'Appointment request submitted successfully.'
  });
});

// Start the server only when app.js is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`CareConnect app is running on port ${PORT}`);
  });
}

module.exports = app;
