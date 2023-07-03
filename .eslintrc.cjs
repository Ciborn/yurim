/* eslint-env node */

module.exports = {
	root: true,
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/eslint-config-typescript'
	],
	parserOptions: {
		ecmaVersion: 'latest',
		project: ['tsconfig.app.json', 'tsconfig.node.json'],
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'vue/html-indent': ['error', 'tab'],
		'vue/script-indent': ['error', 'tab'],
	},
}
