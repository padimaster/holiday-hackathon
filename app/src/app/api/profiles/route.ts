import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const profiles = await prisma.profile.findMany();
    res.status(200).json(profiles);
  } else if (req.method === 'POST') {
    const { handle, address, name, avatar } = req.body;
    const profile = await prisma.profile.create({
      data: { handle, address, name, avatar },
    });
    res.status(201).json(profile);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}