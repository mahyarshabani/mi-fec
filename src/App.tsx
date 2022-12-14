import { Link, Route, Routes } from 'react-router-dom';
import { Button } from 'antd';
import { useEffect } from 'react';

import styles from './app.module.css';
import { AppRoutes } from './pages/routes';
import videoService from './services/videos';
import { useVideosState } from './states/videos-context';
import { VideoList } from './pages/video-list/video-list.page';
import { EditVideo } from './pages/edit-video/edit-video.page';
import { CreateVideo } from './pages/create-video/create-video.page';

export const App = () => {
  const { setVideos, setCategories, setAuthors } = useVideosState();

  useEffect(() => {
    videoService.getAllData().then(({ videos, categories, simpleAuthors }) => {
      setVideos(videos);
      setCategories(categories);
      setAuthors(simpleAuthors);
    });
  }, []);

  return (
    <>
      <header className={styles.header}>
        <Link to={`/${AppRoutes.VIDEO_LIST}`}>
          <span className={styles.homeButton}>Videos</span>
        </Link>

        <Link to={`/${AppRoutes.CREATE_VIDEO}`}>
          <Button type="primary">Add video</Button>
        </Link>
      </header>

      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<VideoList />} />
          <Route path={`/${AppRoutes.EDIT_VIDEO}/:videoId`} element={<EditVideo />} />
          <Route path={`/${AppRoutes.CREATE_VIDEO}`} element={<CreateVideo />} />
        </Routes>
      </main>

      <footer className={styles.footer}>VManager Demo v0.0.1</footer>
    </>
  );
};
