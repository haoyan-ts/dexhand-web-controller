import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { command } = req.body as { command: string };
    // TODO: Integrate your actual robot control logic here.
    console.log("Received command:", command);
    
    // For demonstration, we simply return the command back.
    res.status(200).json({ success: true, command });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
} 