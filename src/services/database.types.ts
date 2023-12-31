export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      PlaylistItem: {
        Row: {
          created_at: string
          duration: number | null
          id: number
          isShort: boolean | null
          playlist_id: number | null
          shortDescription: string | null
          thumbnail: string | null
          title: string | null
          type: string | null
          uploaded: number | null
          uploadedDate: string | null
          uploaderAvatar: string | null
          uploaderName: string | null
          uploaderUrl: string | null
          uploaderVerified: boolean | null
          url: string | null
          views: number | null
        }
        Insert: {
          created_at?: string
          duration?: number | null
          id?: number
          isShort?: boolean | null
          playlist_id?: number | null
          shortDescription?: string | null
          thumbnail?: string | null
          title?: string | null
          type?: string | null
          uploaded?: number | null
          uploadedDate?: string | null
          uploaderAvatar?: string | null
          uploaderName?: string | null
          uploaderUrl?: string | null
          uploaderVerified?: boolean | null
          url?: string | null
          views?: number | null
        }
        Update: {
          created_at?: string
          duration?: number | null
          id?: number
          isShort?: boolean | null
          playlist_id?: number | null
          shortDescription?: string | null
          thumbnail?: string | null
          title?: string | null
          type?: string | null
          uploaded?: number | null
          uploadedDate?: string | null
          uploaderAvatar?: string | null
          uploaderName?: string | null
          uploaderUrl?: string | null
          uploaderVerified?: boolean | null
          url?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'PlaylistItem_playlist_id_fkey'
            columns: ['playlist_id']
            isOneToOne: false
            referencedRelation: 'UserPlaylists'
            referencedColumns: ['id']
          }
        ]
      }
      Subscribeds: {
        Row: {
          channel_id: string | null
          created_at: string
          id: number
          subscriber: Json | null
          user_id: string | null
        }
        Insert: {
          channel_id?: string | null
          created_at?: string
          id?: number
          subscriber?: Json | null
          user_id?: string | null
        }
        Update: {
          channel_id?: string | null
          created_at?: string
          id?: number
          subscriber?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      UserPlaylists: {
        Row: {
          created_at: string
          id: number
          name: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
      Database['public']['Views'])
  ? (Database['public']['Tables'] &
      Database['public']['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
  ? Database['public']['Enums'][PublicEnumNameOrOptions]
  : never
