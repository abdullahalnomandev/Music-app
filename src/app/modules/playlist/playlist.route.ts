import express from 'express';
import { PlaylistController } from './playlist.controller';

const router = express.Router();

router.get('/', PlaylistController.getAllPlaylists);
router.post('/', PlaylistController.createPlaylist);
router.get('/:id', PlaylistController.getPlaylistById);

export const PlaylistRoutes = router;
