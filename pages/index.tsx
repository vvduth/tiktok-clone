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
  console.log(videos)
  return (
    <div className='flex flex-col gap-10 videos h-full'>
      {videos.length ? 
        videos.map((video: Video) => (
          <VideoCard  post={video} key = {video._id}/> 
        )) : (
          <NoResult text="No videos related"/>
        )  
    }
    </div>
  )
}

// if you export a function called getServerProps from a page, next js will pre render this page on each request 
// using data return by the function itself

// only use when we need data instancly when we relaod the page such as user authoriztion or geometry location

// the return value will be pass as a  props for the first rendered component
export const getServerSideProps =async ({query: {topic}}: {query: {topic: string }}) => {
  let response = null  ; 
  
  if (topic) {
     response  = await axios.get(`${BASE_URL}/api/discover/${topic}`)
  } else {
     response  = await axios.get(`${BASE_URL}/api/post`)
  }
  return {
    props: {
      videos: response.data
    }
  }
}
export default Home
