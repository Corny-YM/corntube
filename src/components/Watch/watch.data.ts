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

export enum RadioEnum {
  MP3 = 'mp3',
  MP4 = 'mp4',
}
