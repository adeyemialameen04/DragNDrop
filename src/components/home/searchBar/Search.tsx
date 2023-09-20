import "./search.css";
import { imageData } from "../../../utils/interfaces";

type SearchProps = {
  images: imageData[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onSearch: (image: imageData[]) => void;
  clearTag: () => void;
};

const Search = ({
  images,
  setSearchQuery,
  searchQuery,
  clearTag,
  onSearch,
}: SearchProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTag();
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() !== "") {
      const filteredImages = images.filter((image: imageData) =>
        image.tag.toLowerCase().includes(query.toLowerCase())
      );

      onSearch(filteredImages);
    } else {
      onSearch(images);
    }
  };

  return (
    <div className="container">
      <input
        onChange={(e) => handleInputChange(e)}
        type="search"
        placeholder="Search images by tags eg the task above"
        value={searchQuery}
      />
    </div>
  );
};

export default Search;
