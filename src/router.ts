import {Router} from 'express';

const router = Router();
// Routing

router.get("/", (req, res) => {
  res.send("Desde-get");
});
router.post("/", (req, res) => {
  res.send("Desde-post");
});
router.patch("/", (req, res) => {
  res.send("Desde-patch");
});
router.put("/", (req, res) => {
  res.send("Desde-put");
});
router.delete("/", (req, res) => {
  res.send("Desde-delete");
});

export default router;