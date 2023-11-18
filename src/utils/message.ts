import { message } from 'ant-design-vue'
import { JointContent } from 'ant-design-vue/es/message/interface'

interface IMessagePopup {
  content?: JointContent
  type?: 'info' | 'success' | 'error' | 'warning' | 'loading'
}

enum TypeMessageEnum {
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  LOADING = 'loading',
}

const defaultInfo = 'This feature is being update (*￣3￣)╭'
const defaultSuccess = 'Success default message!'
const defaultError = 'Something went wrong. Sorry about that (～￣▽￣)～'
const defaultWarning = 'Warning default message!'
const defaultLoading = 'Action in progress...'

export const messagePopup = ({
  content,
  type = TypeMessageEnum.INFO,
}: IMessagePopup) => {
  if (type === TypeMessageEnum.INFO) return message.info(content || defaultInfo)
  if (type === TypeMessageEnum.SUCCESS)
    return message.success(content || defaultSuccess)
  if (type === TypeMessageEnum.ERROR)
    return message.error(content || defaultError)
  if (type === TypeMessageEnum.WARNING)
    return message.warning(content || defaultWarning)
  if (type === TypeMessageEnum.LOADING)
    return message.loading(content || defaultLoading)
}
