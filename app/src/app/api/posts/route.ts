import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } else if (req.method === 'POST') {
    const { title, content, profileId } = req.body;
    const post = await prisma.post.create({
      data: { title, content, profileId, imageUrl: '', profile: { connect: { id: profileId } } },
    });
    res.status(201).json(post);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}