import { Schema, model } from 'mongoose';
import { IPlaylist, PlaylistModel } from './playlist.interface';

const playlistSchema = new Schema<IPlaylist, PlaylistModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    songIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Song',
        default: [],
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual field to derive songCount dynamically from songIds.length
playlistSchema.virtual('songCount').get(function () {
  return Array.isArray(this.songIds) ? this.songIds.length : 0;
});

export const Playlist = model<IPlaylist, PlaylistModel>(
  'Playlist',
  playlistSchema
);
