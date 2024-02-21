import express from "express";
import playlist from "./routes/playlist.js";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(playlist);

app.use((req, res) => {
  res.json({ Page: "Not Found" });
});
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

export { app };
