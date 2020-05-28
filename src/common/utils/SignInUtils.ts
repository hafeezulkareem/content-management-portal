import { getAccessToken } from './StorageUtils'

export const isSignedIn = () => {
   return getAccessToken() !== undefined
}
