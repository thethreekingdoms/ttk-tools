import spawn from 'cross-spawn'
import chalk from 'chalk'
import path from 'path'
import { deleteFile } from '../utils'
const { join } = path


async function compile(params) {
    console.log('开始清除dist目录')
    const res2 = await deleteFile('./dist')
    if (!res2) {
        console.log(chalk.greenBright('dist目录清除完成'))
    }
    const releaseRes = await spawn.sync('webpack', [
        '--colors',
        '--progress',
        '--display-error-details',
        '--config',
        'webpack.config.prd.js'
    ], { cwd: join(process.cwd()), stdio: 'inherit' })
    console.log(chalk.greenBright('编译完成！'))
    process.exit()
}

export default compile
