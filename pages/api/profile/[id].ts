// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { json } from 'stream/consumers';
import { client } from '../../../utils/client';

import { singleUserQuery } from '../../../utils/queries';
import { userCreatedPostsQuery } from '../../../utils/queries';
import { userLikedPostsQuery } from '../../../utils/queries';

export default async  function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if( req.method === 'GET') {
    

    const {id} = req.query ;

    const query = singleUserQuery(id) ; 
    const userVideoQuery = userCreatedPostsQuery(id) ; 
    const userLikedVideosQuery = userLikedPostsQuery(id) ; 

    const user = await client.fetch(query ) ; 
    const userVideos = await client.fetch(userVideoQuery) 
    const userLikedVideos = await client.fetch(userLikedVideosQuery)

    res.status(200).json({user: user[0], userVideos, userLikedVideos}) ; 


  }
}
