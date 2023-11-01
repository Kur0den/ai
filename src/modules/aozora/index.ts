//*青空文庫から本をおすすめするモジュール*//

import autobind from 'autobind-decorator';
import Module from '@/module';
import Message from '@/message';
import axios from 'axios';


export default class extends Module {
	public readonly name = 'aozora';

	@autobind
	public install() {
		return {
			mentionHook: this.mentionHook
		};
	}

	private async getAozoraList(): Promise<string[]> {
		const response = await axios.get('https://www.aozora.gr.jp/index_pages/person_all.html');
		const html = response.data;
		const regex = /<a href="\/cards\/\d+\/card\d+\.html">(.+)<\/a>/g;
		const matches = html.matchAll(regex);
		const titles: string[] = [];

		for (const match of matches) {
			titles.push(match[1]);
		}

		return titles;
	}


	@autobind
	private async mentionHook(msg: Message) {
		if (msg.includes(['おすすめの本'])) {
			const aozoraList = await this.getAozoraList();
			const aozora = aozoraList[Math.floor(Math.random() * aozoraList.length)];

			msg.reply(`${aozora}はどう？`);
			return true;
		} else {
			return false;
		}
	}
}


