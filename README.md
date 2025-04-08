# WT_CW2_00018945
Student ID: 00018945
Module: Web Technology (4BUIS011C)


This web application was created to fulfill Web Technology module’s requirements and does not represent an actual company or service.


app is deployed on render: https://wt-cw2-00018945.onrender.com


structure of project:
/fitness-tracker
│
├── app.js                # Main app file
├── .env                  # Environment config (not committed)
├── controllers/          # Logic for goal handling
├── models/               # Mongoose schemas
├── routes/               # Express route definitions
├── services/             # Service layer (DB interaction)
├── views/                # EJS templates
├── public/               # Static assets (css/js/images)
└── README.md             # This file

Fitness Goal Tracker is a full-stack web app built using node.js, express.js, MongoDB, and ejs. users can:

Add Mark Filter Edit/update Delet fitness goals

Track completion stats (Pending, In Progress, Completed)


how to run it on local host:
git clone https://github.com/00018945/WT_CW2_00018945.git
cd WT_CW2_00018945
npm install
node app.js
open: http://localhost:3000