import clone from '../clone'
import chalk from 'chalk'
const path = 'apps/edf'
const apps = [
    'ttk-edf-app-portal',
    'ttk-table-app-simplerpt',
    'ttk-edf-app-login',
    'ttk-table-app-list',
    'ttk-edf-app-root',
    'ttk-edf-app-productlist',
    'ttk-voucher-app-document',
    'ttk-table-app-simplelist',
    'ttk-edf-app-role-auth',
    'ttk-edf-app-saleorder',
    'ttk-table-app-rpt',
    'ttk-edf-app-home',
    'ttk-edf-app-mailshare',
    'ttk-edf-app-operation',
    'ttk-edf-app-stockcard',
    'ttk-edf-app-stockcard',
    'ttk-edf-app-portal-menu'
]
async function  init() {
    for( const i of apps ){
        if( typeof(i) == 'string' ){
            console.log(chalk.greenBright(`正在克隆${i}`))
            await clone(i, `${path}/${i}`, true)
        }
    }
    process.exit()
}

export default init