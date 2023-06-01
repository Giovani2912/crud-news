import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:8800/api/news/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setContent(res.data.content);
    };
    getPost();
  }, [path]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8800/api/news/${path}`, {
        title,
        content,
      });
      setUpdateMode(false);
      console.log("Atualizado com sucesso!");
    } catch (err) {}
  };

  return (
    <div className="container">
      <Sidebar/>
    <div className="singleContainer">
        <div className="mainContent">
          {updateMode ? (
            <input
              type="text"
              value={title}
              className="titleInput"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h1>{title}</h1>
          )}
          {updateMode ? (
            <textarea
              className="singlePostDescInput"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <p className="singlePostDesc">{content}</p>
          )}
          {updateMode ? (<></>):(
            <button
              className="updateButton"
              onClick={() => setUpdateMode(true)}
            >
              EDITAR
            </button>
            )}
            
          {updateMode && (
            <button className="updateButton" onClick={handleUpdate}>
              Update
            </button>
          )}
        </div>
    </div>
    </div>
  );
}
