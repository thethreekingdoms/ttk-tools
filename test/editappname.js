const str = `
export default {
	name: "app-account-addmultiauxitem",
	version: "1.0.0",
	moduleName: '财务',
	description: '期初余额新增辅助项',
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "app-account-addmultiauxitem")
	}
}
`

const a = str.replace(/name:.*,/, function(a) {
    console.log(a)
   return `name: '${'11111'}',` 
})

console.log(a)