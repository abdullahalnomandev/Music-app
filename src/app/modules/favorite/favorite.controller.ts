import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { FavoriteService } from './favorite.service';
import { FAVORITE_TARGET } from './favorite.constant';

const toggleFavorite = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { targetId } = req.params;

  const result = await FavoriteService.toggleFavoriteInDB({
    userId,
    targetId,
    targetType: FAVORITE_TARGET.SONG,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: result.favorited ? 'Added to favorites' : 'Removed from favorites',
    data: result,
  });
});

const getMyFavorites = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const targetType = req.query?.targetType as FAVORITE_TARGET | undefined;

  const result = await FavoriteService.getMyFavoritesFromDB(
    userId,
    targetType,
    req.query as Record<string, any>
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Favorites retrieved successfully',
    pagination: result.pagination,
    data: result.data,
  });
});

const checkFavorite = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { targetId, targetType } = req.params;

  const result = await FavoriteService.checkFavoriteInDB(
    userId,
    targetId,
    targetType as FAVORITE_TARGET
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Favorite status retrieved successfully',
    data: result,
  });
});

export const FavoriteController = {
  toggleFavorite,
  getMyFavorites,
  checkFavorite,
};
