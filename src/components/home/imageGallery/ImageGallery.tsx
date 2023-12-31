import { useEffect, useState } from "react";
import { imagesData } from "../../../utils/data";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./imageGallery.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  closestCenter,
  useSensors,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import Search from "../searchBar/Search";
import { imageData } from "../../../utils/interfaces";

type ImageItemProps = {
  path: string;
  tag: string;
  index: number; // Add id to identify items
  isDraggable: boolean;
};

const ImageItem = ({ path, tag, index, isDraggable }: ImageItemProps) => {
  const [draggedImageIndex, setDraggedImageIndex] = useState<number | null>(
    null
  );
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: index });
  const isDragged = index === draggedImageIndex;
  const zIndex = isDragged ? 100 : 0;
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    zIndex,
    touchAction: isDraggable ? "none" : "auto",
  };

  const handleDragStart = () => {
    setDraggedImageIndex(index);
    if (!isDraggable) {
      return false;
    }
  };

  return (
    <article
      className="image__item"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onDragStart={handleDragStart}
    >
      <div>
        <img src={path} alt={`${tag} image`} />
      </div>
      <p>{tag}</p>
    </article>
  );
};

type ImageGalleryProps = {
  selectedTag: string;
  clearTag: () => void;
};

const ImageGallery = ({ selectedTag, clearTag }: ImageGalleryProps) => {
  const [searchQuery, setSearchQuery] = useState(""); // Step 1: Create state for searchQuery
  const [isLoading, setIsLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);
  const filteredImages = imagesData.filter(
    (image) => image.tag === selectedTag
  );
  const [tryImages, setTryImages] = useState(imagesData);
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 50, tolerance: 10 },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [selectedTag]);

  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  const renderImages = () => {
    if (isLoading) {
      return tryImages.map((imageData) => (
        <Skeleton key={imageData.path} height={400} />
      ));
    } else {
      return (
        <SortableContext
          strategy={rectSortingStrategy}
          items={tryImages.map((img, index) => ({ ...img, id: index + 1 }))}
        >
          <>
            {tryImages.map((imageData, index) => (
              <ImageItem
                key={imageData.path}
                tag={imageData.tag}
                path={imageData.path}
                index={index + 1} // Pass id to identify items
                isDraggable={!isTouchDevice}
              />
            ))}
          </>
        </SortableContext>
      );
    }
  };

  useEffect(() => {
    if (selectedTag === "") {
      setTryImages(imagesData);
    } else {
      setTryImages(filteredImages);
    }
  }, [selectedTag]);

  const handleDragEnd = ({ active, over }: any) => {
    if (
      !active.data.current ||
      !active.data.current.sortable ||
      !over ||
      !over.data.current ||
      !over.data.current.sortable
    ) {
      return;
    }

    const imagesCopy = [...tryImages];
    const [draggedImage] = imagesCopy.splice(
      active.data.current.sortable.index,
      1
    );

    imagesCopy.splice(over.data.current.sortable.index, 0, draggedImage);
    setTryImages(imagesCopy);
  };

  const handleSearch = (searchResults: imageData[]) => {
    setTryImages(searchResults);
    if (searchResults.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
  };

  return (
    <main className="imageGallery__main">
      <Search
        onSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        clearTag={clearTag}
        images={imagesData}
      />
      <>{noResults && <p>No tag was found</p>}</>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="container">
          <div className="imageGallery__container">{renderImages()}</div>
        </div>
      </DndContext>
    </main>
  );
};

export default ImageGallery;
