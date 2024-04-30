import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export * from './beverages'
export * from './customer-rare'

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

export default pinia