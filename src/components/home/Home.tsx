import { useState } from "react";
import ImageGallery from "./imageGallery/ImageGallery";
import Tags from "./tags/Tags";
import Navbar from "../navbar/Navbar";
import "./home.css";

const Home = () => {
  const [selectedTag, setSelectedTag] = useState("");

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  const clearTag = () => {
    setSelectedTag("");
  };

  return (
    <main className="home">
      <Navbar />
      <Tags
        selectedTag={selectedTag}
        clearTag={clearTag}
        handleTagClick={handleTagClick}
      />
      <ImageGallery clearTag={clearTag} selectedTag={selectedTag} />
    </main>
  );
};

export default Home;
