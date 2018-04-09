import chalk from 'chalk'

async function reset(path) {
    if (typeof (path) != 'string') {
        path = './apps'
    }
    console.log('正在检查当前路径' + path + '是否存在app...')
    
    const apps = await readDir(path)
    for (let i = 0; i < apps.length; i++) {
        const appItemPath = apps[i]
        console.log(`${path}/apps/${appItemPath}`)
    }
}