import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export * from './customer-rare'
export * from './beverages'
export * from './recipes'
export * from './ingredients'

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

export default pinia