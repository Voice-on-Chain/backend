import express from "express";
import { SearchController } from "./../controllers/search.controller";

const searchController = new SearchController();
const router = express.Router();

router.get("/", searchController.search);

export default router;
