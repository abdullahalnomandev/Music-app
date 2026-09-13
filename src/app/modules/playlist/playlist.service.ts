import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IPlaylist } from './playlist.interface';
import { Playlist } from './playlist.model';

const getAllPlaylistsFromDB = async (): Promise<IPlaylist[]> => {
  const playlists = await Playlist.find().lean();
  return playlists.map(playlist => ({
    ...playlist,
    songCount: Array.isArray(playlist.songIds) ? playlist.songIds.length : 0,
  }));
};

const createPlaylistInDB = async (payload: Partial<IPlaylist>): Promise<IPlaylist> => {
  const playlist = await Playlist.create(payload);
  const result = playlist.toObject();
  return {
    ...result,
    songCount: Array.isArray(result.songIds) ? result.songIds.length : 0,
  };
};

const getPlaylistByIdFromDB = async (id: string): Promise<IPlaylist> => {
  const playlist = await Playlist.findById(id).populate('songIds').lean();
  if (!playlist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Playlist not found');
  }
  return {
    ...playlist,
    songCount: Array.isArray(playlist.songIds) ? playlist.songIds.length : 0,
  };
};

export const PlaylistService = {
  getAllPlaylistsFromDB,
  createPlaylistInDB,
  getPlaylistByIdFromDB,
};
