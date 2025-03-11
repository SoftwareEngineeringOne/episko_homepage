import express from "express";

const router = express.Router();

router.get("/github", redirect("github.com/SoftwareEngineeringOne/episko"));
router.get("/latest", redirect("github.com/SoftwareEngineeringOne/episko/releases/latest"));

router.get("/docs", redirect("docs.rs/episko_lib/latest/episko_lib/"));
router.get("/tiktaktoe", redirect("tiktaktoe.episko.de"))

export default router;

function redirect(url) {
  return (req, res) => {
    res.redirect(`https://${url}`);
  }
}
