import { message } from 'ant-design-vue'

interface IMessagePopup {
  title?: string
  type?: 'info' | 'success' | 'error' | 'warning'
}

enum TypeMessageEnum {
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
}

const defaultInfo = 'This feature is being update (*￣3￣)╭'
const defaultSuccess = 'Success default message!'
const defaultError = 'Something went wrong. Sorry about that (～￣▽￣)～'
const defaultWarning = 'Warning default message!'

export const messagePopup = ({
  title,
  type = TypeMessageEnum.INFO,
}: IMessagePopup) => {
  if (type === TypeMessageEnum.INFO) return message.info(title || defaultInfo)
  if (type === TypeMessageEnum.SUCCESS)
    return message.success(title || defaultSuccess)
  if (type === TypeMessageEnum.ERROR)
    return message.error(title || defaultError)
  if (type === TypeMessageEnum.WARNING)
    return message.warning(title || defaultWarning)
}
