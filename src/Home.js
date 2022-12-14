import BlogList from './BlogList';
import useFetch from './useFetch';
import { useState } from 'react'
import { useEffect } from 'react'


const Home = () => {
    const{ data: blogs, isPending, error } = useFetch('http://localhost:8000/blogs');
    const [chosenStars, setChosenStars] = useState("1");
    const [currentBlogs, setCurrentBlogs] = useState(blogs);
    useEffect(() => { setCurrentBlogs(blogs)}, [blogs] )

    const handleSubmit = (e) => {
        e.preventDefault();
       // blogs=blogs.filter( (blog)=>  blog.stars === chosenStars)
        setCurrentBlogs(blogs.filter( (blogs)=> blogs.stars === chosenStars))
    }

    return (
        <div className="home">
            { error && <div> { error } </div>}
            { isPending && <div> Loading..  </div> }

            <div className='sorting'>
                < form onSubmit={handleSubmit}>
                <label>Sort by : </label>
                    <select
                        value = {chosenStars}
                        onChange={(e) => setChosenStars(e.target.value)}
                    >
                        <option value="1">1 star</option>
                        <option value="2">2 stars</option>
                        <option value="3">3 stars</option>
                    </select>
                    <button className='sort'>Sort</button>
                </form>
                <button onClick={()=>setCurrentBlogs(blogs)}> View all </button>
            </div>
            {currentBlogs && <BlogList blogs={currentBlogs} title=""/>}
                
          {/* { blogs && <BlogList blogs={blogs.filter( (blog)=>  blog.author ==='Sully')} title="Sully's fav"/> } */}
          </div>
    );
}
 
export default Home;