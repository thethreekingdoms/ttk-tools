//import 'babel-polyfill'
import 'url-polyfill'

import ttk_edf_app_portal_menu_detail from './apps/edf/ttk-edf-app-portal-menu/apps/ttk-edf-app-portal-menu-detail'
import ttk_edf_app_operation from './apps/edf/ttk-edf-app-operation/index.js'


//#endregion

import aaaa from 'bbb' 

const apps = {

    [aaaa.name]: aaaa,


    [ttk_edf_app_login.name]: ttk_edf_app_login,
}

apps.config = (options) => {
    Object.keys(options).forEach(key => {
        const reg = new RegExp(`^${key == '*' ? '.*' : key}$`)
        Object.keys(apps).forEach(appName => {
            if (appName != 'config') {
                if (reg.test(appName)) {
                    apps[appName].config(options[key])
                }
            }
        })
    })
}


promise.polyfill()

apps.config({ '*': { apps } })

config(myConfig({ apps }))

Object.keys(edfComponents).forEach(key => {
    componentFactory.registerComponent(key, edfComponents[key])
})



start()
FastClick.attach(document.body)