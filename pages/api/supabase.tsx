import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const SUPABASE_URL = process.env.SUPABASE_URL;
        const SUPABASE_ANOM_KEY = process.env.SUPABASE_ANOM_KEY;SUPABASE_ANOM_KEY

        res.status(200).json({SUPABASE_URL, SUPABASE_ANOM_KEY})
    } else {
        res.status(405).json({message: 'Not allowed method'})
    }
}