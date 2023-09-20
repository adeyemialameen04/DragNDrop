import { tags } from "../../../utils/data";
import "./tag.css";

type TagsProps = {
  selectedTag: string;
  handleTagClick: (value: string) => void;
  clearTag: () => void;
};

type TagItemProps = {
  tagName: string;
  selectedTag: string;
  handleTagClick: (value: string) => void;
};

const TagItem = ({ tagName, selectedTag, handleTagClick }: TagItemProps) => {
  return (
    <>
      <button
        onClick={() => handleTagClick(tagName)}
        className={`tagBtn ${selectedTag === tagName && "activeTag"}`}
      >
        {tagName}
      </button>
    </>
  );
};

const Tags = ({ selectedTag, handleTagClick, clearTag }: TagsProps) => {
  return (
    <aside>
      <div className="container tags__container">
        <button onClick={clearTag}>All</button>
        {tags.map((tag) => (
          <TagItem
            key={tag.id}
            tagName={tag.tagName}
            selectedTag={selectedTag}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    </aside>
  );
};

export default Tags;
