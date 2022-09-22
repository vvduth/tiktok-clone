import type { NextPage } from 'next'
import axios from 'axios'
import {Video} from '../types' 
import VideoCard from '../components/VideoCard'
import NoResult from '../components/NoResult'
import { BASE_URL } from '../utils'
interface Iprops {
  videos: Video[]
}

const Home: NextPage<Iprops> = ({videos}: Iprops) => {
  return (
    <div className='flex flex-col gap-10 videos h-full'>
      {videos.length ? 
        videos.map((video: Video) => (
          <VideoCard  post={video} key = {video._id}/> 
        )) : (
          <NoResult text="No"/>
        )  
    }
    </div>
  )
}

// if you export a function called getServerProps from a page, next js will pre render this page on each request 
// using data return by the function itself

// only use when we need data instancly when we relaod the page such as user authoriztion or geometry location

// the return value will be pass as a  props for the first rendered component
export const getServerSideProps =async () => {
  const {data} = await axios.get(`${BASE_URL}/api/post`)
  
  return {
    props: {
      videos: data
    }
  }
}
export default Home
