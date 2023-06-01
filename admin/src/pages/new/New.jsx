import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import { useState } from "react";

const New = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      content,
    };

    try {
      const res = await axios.post("http://localhost:8800/api/news", newPost);
      window.location.replace("/news/" + res.data._id);
      alert("Criado com sucesso!");
    } catch (err) {}
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top"></div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                className="writeInput"
                autoFocus={true}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="writeFormGroup">
                <textarea
                  placeholder="Tell your story..."
                  type="text"
                  className="writeInput writeText"
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
              <button className="writeSubmit" type="submit">
                Criar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
