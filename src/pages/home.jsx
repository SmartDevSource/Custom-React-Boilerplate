import { useEffect, useState } from "react";
import { useAtom } from 'jotai'
import { userAtom } from '../atoms/user'

const Home = () =>{

  const [articles, setArticles] = useState([]);
  const [user, setUser] = useAtom(userAtom);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [successPost, setSuccessPost] = useState(false);

  const getArticles = async () =>{
      try{
        const response = await fetch('http://localhost:3000/articles', {
          method:'get'
        })

        if (response.ok){
          const data = await response.json();
          return data;
        } else {
          throw new Error('Erreur lors de la récupération des articles');
        }
      }catch(error){
        console.log("Erreur lors de la récupération des articles : "+error);
      }
   }

   const handleTitleChange = (e)=>{
    setTitle(e.target.value);
  }

  const handleContentChange = (e)=>{
    setContent(e.target.value);
  }

  const handleArticlePost = async () =>{
    try{
      const data = {article:{
        title: title,
        content: content,
        author: user.username
      }}

      const response = await fetch('http://localhost:3000/articles', {
        method:'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })

      if (response.ok){
        setSuccessPost(true);
      } else {
        throw new Error(`Erreur lors de la publication de l'article`);
      }
    }catch(error){
      console.log(`Erreur lors de la publication de l'article `+error);
    }
  }

  const handleDeletePost = async (id)=>{
    try{

      const response = await fetch(`http://localhost:3000/articles/${id}`, {
        method:'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: id})
      })

      if (response.ok){
        setSuccessPost(true);
      } else {
        throw new Error(`Erreur lors de la suppression de l'article`);
      }
    }catch(error){
      console.log(`Erreur lors de la suppression de l'article `+error);
    }
  }

  useEffect(()=>{
    const fetchArticles = async () =>{
      const articlesData = await getArticles();
      setArticles(articlesData);
    }
    fetchArticles();
  }, [])

  useEffect(()=>{
    const fetchArticles = async () =>{
      const articlesData = await getArticles();
      setArticles(articlesData);
      setSuccessPost(false);
    }
    fetchArticles();
  }, [successPost])

  return (
    <div className="flexcol mt30">
    <h1>Accueil</h1>
    {user.isLogged && 
      <>
      <h3 className="m10">Poster un article</h3>
      <p>Titre de l'article </p>
      <input type = "text" onChange={handleTitleChange}></input>
      <p>Contenu de l'article </p>
      <input type = "text" onChange={handleContentChange}></input>
      <button className="m5" type = "submit" onClick={handleArticlePost}>Poster</button>
      </>
    }
      <div className="flexcol">
        {articles.slice().reverse().map(article=>(
          <div className = "article" key = {article.id}>
            <h2 className="m5">{article.title}</h2>
            <p className="m5">Auteur : <b>{article.author}</b></p>
            <p>{article.content}</p>
            {article.author === user.username && <button className = "m5" type = "submit" onClick={()=>handleDeletePost(article.id)}>Supprimer mon post</button>}
          </div>
        ))}
      </div>
    </div>
  )

}

export default Home;