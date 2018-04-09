import clone from '../clone'
import chalk from 'chalk'
async function cloneApps(path, apps) {
    for (const i of apps) {
        if (typeof (i) == 'string') {
            console.log(chalk.greenBright(`正在克隆app - ${i}`))
            await clone(i, `${path}/${i}`, true)
        }
    }
}

export default cloneApps

// ttk-edf-app-portal ttk-edf-app-login ttk-edf-app-home ttk-edf-app-portal-menu