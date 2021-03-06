const state = require('./../lib/state');
const AWS = require('aws-sdk-mock');

describe('', () => {
	test('generate', () => {
		AWS.mock('CloudFormation', 'getTemplate', {
			TemplateBody: '{"mocked": true}',
		});
		const cf = require('./fixtures/describe-stacks.json');
		const expected = require('./fixtures/state.json');
		const opts = {
			stack: 'lambda-monitoring',
			resourceName: 'network',
		};
		return state.generate(opts, cf.Stacks[0]).then(result => {
			expect(result).toEqual(expected);
		});
	});
});
