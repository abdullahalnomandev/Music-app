import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { SongRoutes } from '../app/modules/song/song.route';
import { VideoRoutes } from '../app/modules/video/video.route';
import { PlaylistRoutes } from '../app/modules/playlist/playlist.route';
import { RatingRoutes } from '../app/modules/rating/rating.route';
import { FavoriteRoutes } from '../app/modules/favorite/favorite.route';

const router = express.Router();

const apiRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/songs',
    route: SongRoutes,
  },
  {
    path: '/videos',
    route: VideoRoutes,
  },
  {
    path: '/playlists',
    route: PlaylistRoutes,
  },
  {
    path: '/ratings',
    route: RatingRoutes,
  },
  {
    path: '/favorites',
    route: FavoriteRoutes,
  },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
