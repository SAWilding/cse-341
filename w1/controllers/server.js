var express = require("express");
var app = express();
var cors = require("cors");

const corsOptions = { origin: "http://http://localhost:3000/", optionsSuccessStatus: 200, };

app.use(cors(corsOptions));

app.use("/", require("./routes"));

app.get("/professional", (req, res) => {
  res.json({ professionalName: "Ryan Madsen", base64Image: "test.jpg", primaryDescription: "Full Stack Developer", workDescription1: "I am a full stack developer 1", workDescription2: "I am a full stack developer 2", nameLink: { firstName: "Ryan", url: "#", }, linkTitleText: "LinkedIn", linkedInLink: { text: "LinkedIn", link: "#", }, githubLink: { text: "GitHub", link: "#", }, });
})

app.listen(8080, () => {
  console.log("Server started on port 8080")
})