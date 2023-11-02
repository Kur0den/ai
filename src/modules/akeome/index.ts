import autobind from 'autobind-decorator';
import Module from '@/module';
import serifs from '@/serifs';

export default class extends Module {
	public readonly name = 'akeome';

	@autobind
	public install() {
		this.crawleNewYear();
		setInterval(this.crawleNewYear, 1000 * 60 * 1);

		return {};
	}

	/**Happy New Year!**/

	@autobind
	private crawleNewYear() {
		const now = new Date();

		const isNewYear = now.getMonth() == 0 && now.getDate() == 1 && now.getHours() == 0 && now.getMinutes() == 0;

		const akeome = serifs.akeome.HappyNewYear;

		if (isNewYear) {
			this.ai.post({
				text: akeome
			});
		};
		};
	}; // This is the missing closing brace
