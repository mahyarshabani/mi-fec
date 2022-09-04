import { Author, Category, ProcessedVideo } from '../common/interfaces';
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

type VideoState = {
  videos: ProcessedVideo[];
  authors: Author[];
  categories: Category[];
};

type VideosContext = {
  setAuthors: Dispatch<SetStateAction<Author[]>>;
  setVideos: Dispatch<SetStateAction<ProcessedVideo[]>>;
  setCategories: Dispatch<SetStateAction<Category[]>>;
  addVideo: (video: ProcessedVideo) => void;
  removeVideo: (selectedVideo: ProcessedVideo) => void;
  editVideo: (selectedVideo: ProcessedVideo) => void;
  moveVideoToOtherAuthor: (selectedVideo: ProcessedVideo) => void;
} & VideoState;

export const VideosStateContext = createContext<VideosContext | undefined>(undefined);

export const VideosStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [videos, setVideos] = useState<ProcessedVideo[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const addVideo = (video: ProcessedVideo) => {
    debugger;
    setVideos([...videos, video]);
  };

  const editVideo = (selectedVideo: ProcessedVideo) => {
    const updatedVideos = videos.map((video) => (video.id === selectedVideo.id ? selectedVideo : video));
    setVideos(updatedVideos);
  };

  const removeVideo = (selectedVideo: ProcessedVideo) => {
    const videoIndex = videos.findIndex((video) => video.id === selectedVideo.id);
    if (videoIndex > -1) {
      const cloneVideos = [...videos];
      cloneVideos.splice(videoIndex, 1);
      setVideos(cloneVideos);
    }
  };

  const moveVideoToOtherAuthor = (selectedVideo: ProcessedVideo) => {
    const cloneVideos = [...videos];

    const videoIndex = videos.findIndex((video) => video.id === selectedVideo.id);
    if (videoIndex > -1) {
      cloneVideos.splice(videoIndex, 1);
    }

    cloneVideos.push(selectedVideo);

    setVideos(cloneVideos);
  };

  return (
    <VideosStateContext.Provider
      value={{
        videos,
        authors,
        categories,
        setVideos,
        addVideo,
        removeVideo,
        editVideo,
        moveVideoToOtherAuthor,
        setAuthors,
        setCategories,
      }}>
      {children}
    </VideosStateContext.Provider>
  );
};

export const useVideosState = () => {
  const context = useContext(VideosStateContext);
  if (context === undefined) {
    throw new Error('no');
  }
  return context;
};
