export function useDebounce(func: Function, wait: number): Function {
  let timeout: NodeJS.Timeout | null

  return function (this: any, ...args: any[]) {
    const context = this

    if (timeout !== null) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}
