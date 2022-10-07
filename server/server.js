import app from "./app";
import config from "./config";

const { PORT } = config;
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
