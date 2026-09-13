import { Model, Types } from 'mongoose';
import { ISong } from '../song/song.interface';

export interface IPlaylist {
  _id?: Types.ObjectId;
  name: string;
  songIds: Types.ObjectId[] | ISong[];
  songCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PlaylistModel = Model<IPlaylist>;
