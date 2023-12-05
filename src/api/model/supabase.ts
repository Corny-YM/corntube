import { Json } from '@/services/database.types'

export interface IUser {
  id: string
  aud: string
  role: string
  email: string
  email_confirmed_at: string
  phone: string
  confirmed_at: string
  last_sign_in_at: string
  app_metadata: AppMetadata
  user_metadata: Data
  identities: Identity[]
  created_at: string
  updated_at: string
}

export interface AppMetadata {
  provider: string
  providers: string[]
}

export interface Identity {
  id: string
  user_id: string
  identity_data: Data
  provider: string
  last_sign_in_at: string
  created_at: string
  updated_at: string
}

export interface Data {
  avatar_url: string
  email: string
  email_verified: boolean
  full_name: string
  iss: string
  name: string
  phone_verified: boolean
  picture: string
  provider_id: string
  sub: string
}

export interface StoreSubscribedRequest {
  user_id: string
  channel_id: string
  subscriber: Json
}
export interface DestroySubscribedRequest {
  user_id: string
  channel_id: string
}

export interface ISubscribed {
  id: number
  subscriber: any
  user_id: string | null
  channel_id: string | null
  created_at: string
}
