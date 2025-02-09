const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json()); // Parse JSON body requests

app.post('/verifyCap', async (req: any, res: any) => {
  const captchaValue = req.body.capVal;

  if (!captchaValue) {
    return res.status(400).json({ error: 'Captcha value is missing' });
  }

  try {
    const { data } = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
      params: {
        secret: process.env.SITE_SECRET,
        response: captchaValue,
      },
    });

    if (data.success) {
      res.status(200).json({ message: { success: true } });
    } else {
      res.status(400).json({ error: 'Captcha verification failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Captcha verification request failed' });
  }
});
