import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const userName = req.query.id;
        axios.get(`https://api.github.com/users/${userName}`, {
            headers: {
                'Authorization': `token ${process.env.GITHUB_TOKEN}`
            }
        })
        .then(result => { 
            res.status(200).json(result.data);
        })
        .catch(err => {res.status(500).json(err)});
    } else {
        res.status(405).json({message: 'Not allowed method'})
    }
}