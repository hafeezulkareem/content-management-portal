export function resolveWithTimeOut<T>(response: T): Promise<T> {
   const timeOut = process.env.NODE_ENV === 'test' ? 0 : 1000
   return new Promise(resolve => {
      setTimeout(() => resolve(response), timeOut)
   })
}
