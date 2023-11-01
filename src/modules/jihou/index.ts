import Module from '@/module';
import autobind from 'autobind-decorator';

const accurateInterval = require('accurate-interval');

export default class extends Module {
	public readonly name = 'jihou';

	@autobind
	public install() {
        const now = new Date();
        const delay = 60 - now.getMinutes();
        setTimeout(() => {
            this.post();
            accurateInterval(this.post, 1000* 60 * 60);
        }, delay * 60 * 1000);

        return {};
	}

	@autobind
	private async post() {
		const date = new Date();
		const hour = date.getHours();

		switch (hour) {
			default:
				this.ai.post({
					text: `${hour}時です♪`
				});
				break;

			case 7:
				this.ai.post({
					text: `おはようございます！${hour}時です♪`
				});
				break;

			case 8:
				this.ai.post({
								text: `${hour}時ですよ！今日も一日頑張ってください♪`
				});
				break;
            
            case 1:
				this.ai.post({
					text: `${hour}時です！ふぁぁ……眠くなってきちゃいました……`
				});
				break;

		}
	}
}
