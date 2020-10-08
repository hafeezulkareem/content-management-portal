import { getAccessToken } from './StorageUtils'

export const isSignedIn = (): boolean => {
   return getAccessToken() !== undefined
}
