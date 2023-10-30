export interface ITrending {
  url: string
  type: string
  title: string
  thumbnail: string
  uploaderName: string
  uploaderUrl: string
  uploaderAvatar: string
  uploadedDate: string
  shortDescription: string
  duration: number
  views: number
  uploaded: number
  uploaderVerified: boolean
  isShort: boolean
}

export interface IComments {
  comments: IComment[]
  nextpage: string
  disabled: boolean
  commentCount: number
}
export interface IComment {
  author: string
  thumbnail: string
  commentId: string
  commentText: string
  commentedTime: string
  commentorUrl: string
  repliesPage: null | string
  likeCount: number
  replyCount: number
  hearted: boolean
  pinned: boolean
  verified: boolean
  creatorReplied: boolean
  channelOwner: boolean
}

export interface IStreams {
  title: string
  description: string
  uploadDate: string
  uploader: string
  uploaderUrl: string
  uploaderAvatar: string
  thumbnailUrl: string
  hls: string
  dash: null
  lbryId: null
  category: string
  license: string
  visibility: string
  tags: string[]
  metaInfo: any[]
  uploaderVerified: boolean
  duration: number
  views: number
  likes: number
  dislikes: number
  uploaderSubscriberCount: number
  audioStreams: IOStream[]
  videoStreams: IOStream[]
  relatedStreams: IRelatedStream[]
  subtitles: ISubtitle[]
  livestream: boolean
  proxyUrl: string
  chapters: any[]
  previewFrames: IPreviewFrame[]
}

export interface IOStream {
  url: string
  format: Format
  quality: string
  mimeType: MIMEType
  codec: null | string
  audioTrackId: null
  audioTrackName: null
  audioTrackType: null
  audioTrackLocale: null
  videoOnly: boolean
  itag: number
  bitrate: number
  initStart: number
  initEnd: number
  indexStart: number
  indexEnd: number
  width: number
  height: number
  fps: number
  contentLength: number
}

export enum Format {
  M4A = 'M4A',
  MPEG4 = 'MPEG_4',
  V3GPP = 'v3GPP',
  Webm = 'WEBM',
  WebmaOpus = 'WEBMA_OPUS',
}

export enum MIMEType {
  AudioMp4 = 'audio/mp4',
  AudioWebm = 'audio/webm',
  Video3Gpp = 'video/3gpp',
  VideoMp4 = 'video/mp4',
  VideoWebm = 'video/webm',
}

export interface IPreviewFrame {
  urls: string[]
  frameWidth: number
  frameHeight: number
  totalCount: number
  durationPerFrame: number
  framesPerPageX: number
  framesPerPageY: number
}

export interface IRelatedStream {
  url: string
  type: Type
  title?: string
  thumbnail: string
  uploaderName: string
  uploaderUrl: null | string
  uploaderAvatar?: string
  uploadedDate?: string
  shortDescription?: null | string
  duration?: number
  views?: number
  uploaded?: number
  uploaderVerified: boolean
  isShort?: boolean
  name?: string
  playlistType?: string
  videos?: number
}

export enum Type {
  Playlist = 'playlist',
  Stream = 'stream',
}

export interface ISubtitle {
  url: string
  mimeType: string
  name: string
  code: string
  autoGenerated: boolean
}
