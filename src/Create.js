import { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Sully');
    const [stars, setStars] = useState("1");
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author, stars};

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(blog)
        }).then ( () => {
            console.log('new blog added')
            setIsPending(false);
            //history.go(-1);
            history.push('/')
        })
    }

    return ( 
        <div className="create">
            <h2>Add a new anime</h2>
            < form onSubmit={handleSubmit}>
                <label> Anime title </label>
                <input 
                    type="text" 
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label> Your opinion:  </label>
                <textarea 
                    required
                    value={body}
                    onChange={(e)=> setBody(e.target.value)}
                >
                </textarea>
                <label> Stars : </label>
                <select
                    value = {stars}
                    onChange={(e) => setStars(e.target.value)}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <label> Artcile author: </label>
                <select
                    value = {author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="Sully">Sully</option>
                    <option value="Shaelynn">Shaelynn</option>
                    <option value="Sullivan">Sullivan</option>
                </select>
            { !isPending && <button> Add blog </button> }
            { isPending && <button disabled> Adding blogs...</button> }
            </form>
        </div>
     );
}
 

export default Create;