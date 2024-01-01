import { IAddUserPlaylistItem } from '@/api/model/supabase'

interface IOption {
  label: string
  value: string
}
export interface IDownloadModalProps {
  open: boolean
  options: {
    mp3: IOption[]
    mp4: IOption[]
  }
}
export interface IShareModalProps {
  open: boolean
}
export interface IPlaylistAddModalProps {
  open: boolean
  video: IAddUserPlaylistItem
}

export enum RadioEnum {
  MP3 = 'mp3',
  MP4 = 'mp4',
}

export const controls = [
  'play-large',
  'rewind',
  'play',
  'fast-forward',
  'progress',
  'current-time',
  'duration',
  'mute',
  'volume',
  'captions',
  'settings',
  'pip',
  'airplay',
  'download',
  'fullscreen',
]
