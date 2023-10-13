import server from "./server/express.js"
const port = 3000;

 server.get('/', (req, res) => {
   res.json({ message: "Welcome to the DressStore app" });
 });

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
