import { provideGlobalConfig } from '../hooks'

export const INSTALLED_KEY = Symbol('INSTALLED_KEY')

export function makeInstaller(components: any = []) {
  const install = (app: any, options?: any) => {
    if (app[INSTALLED_KEY])
      return

    app[INSTALLED_KEY] = true
    components.forEach(c => app.use(c))

    if (options)
      provideGlobalConfig(options, app, true)
  }

  return {
    install,
  }
}
