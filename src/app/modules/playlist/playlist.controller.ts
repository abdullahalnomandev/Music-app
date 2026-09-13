import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PlaylistService } from './playlist.service';

const getAllPlaylists = catchAsync(async (req: Request, res: Response) => {
  const result = await PlaylistService.getAllPlaylistsFromDB();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Playlists retrieved successfully',
    data: result,
  });
});

const createPlaylist = catchAsync(async (req: Request, res: Response) => {
  const result = await PlaylistService.createPlaylistInDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Playlist created successfully',
    data: result,
  });
});

const getPlaylistById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PlaylistService.getPlaylistByIdFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Playlist retrieved successfully',
    data: result,
  });
});

export const PlaylistController = {
  getAllPlaylists,
  createPlaylist,
  getPlaylistById,
};
