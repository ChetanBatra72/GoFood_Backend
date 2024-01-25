const express = require("express");
const router = express.Router(); // calling it here
router.post("/foodData", (req, res) => {
  try {
    // console.log(global.food_items);
    res.send([global.food_items , global.food_Category]);
    // return res.json({ success: true } );
  } catch (error) {
    console.error(error.message);
    res.send("Server Error");
  }
});
module.exports = router;
