export interface ITrending {
  duration: number
  isShort: boolean
  shortDescription: string
  thumbnail: string
  title: string
  type: Type
  uploaded: number
  uploadedDate: string
  uploaderAvatar: string
  uploaderName: string
  uploaderUrl: string
  uploaderVerified: boolean
  url: string
  views: number
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

export interface IPlaylist {
  bannerUrl: string | null
  description: string
  name: string
  nextpage: string | null
  relatedStreams: ITrending[]
  thumbnailUrl: string
  uploader: string
  uploaderAvatar: string
  uploaderUrl: string
  videos: number
}

export interface IChannel {
  id: string
  name: string
  avatarUrl: string
  bannerUrl: string
  description: string
  nextpage: string
  subscriberCount: number
  verified: boolean
  relatedStreams: ITrending[]
  tabs: {
    name: string
    data: string
  }[]
}

export interface ITabShort {
  nextpage: string
  content: IShort[]
}
export interface ITabPlaylist {
  nextpage: string
  content: IPlaylistContent[]
}
export interface ITabChannel {
  nextpage: string
  content: IChannelContent[]
}
export interface ITabLiveStream {
  nextpage: string
  content: ILiveStream[]
}

export interface IPlaylistContent extends IDefaultStream {
  videos: number
}
export interface IShort extends ITrending {}
export interface ILiveStream extends ITrending {}
export interface IChannelContent {
  description: string
  name: string
  subscribers: number
  thumbnail: string
  type: Type
  url: string
  verified: boolean
  videos: number
}

// Related IStreams====================================
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

interface IDefaultStream {
  name: string
  playlistType: string
  thumbnail: string
  type: Type
  uploaderName: string
  uploaderVerified: boolean
  url: string
}

export interface IRelatedStream {
  duration?: number
  isShort?: boolean
  shortDescription?: null | string
  thumbnail: string
  title?: string
  uploaded?: number
  uploadedDate?: string
  uploaderAvatar?: string
  uploaderUrl: null | string
  views?: number
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
