import { SelectProps } from 'ant-design-vue'

export const filterSearch: SelectProps['options'] = [
  {
    value: 'all',
    label: 'Tất cả',
  },
  {
    value: 'videos',
    label: 'Videos',
  },
  {
    value: 'channels',
    label: 'Kênh',
  },
  {
    value: 'playlists',
    label: 'Danh sách phát',
  },
]
