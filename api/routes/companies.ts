import express, { Router } from 'express';
import { stocksInfo } from '../controllers/companies';

const router: Router = express.Router({
  caseSensitive: true,
  strict: true
});

router.get('/companies/stocks/:company', stocksInfo);

export default router;
