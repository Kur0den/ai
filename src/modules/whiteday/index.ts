import autobind from 'autobind-decorator';
import Module from '@/module';
import Friend from '@/friend';
import serifs from '@/serifs';

export default class extends Module {
    public readonly name = 'whiteday';

    @autobind
    public install() {
        this.crawleWhiteday();
        setInterval(this.crawleWhiteday, 1000 * 60 * 3);

        return {};
    }

    /** お返し**/
	@autobind
	private crawleWhiteday() {
		const now = new Date();

		const isWhiteday = now.getMonth() == 2 && now.getDate() == 14;
		if (!isWhiteday) return;

		const date = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;

		const friends = this.ai.friends.find({} as any);

		friends.forEach(f => {
			const friend = new Friend(this.ai, { doc: f });

			// 親愛度が5以上必要
			if (friend.love < 5) return;

			const data = friend.getPerModulesData(this);

			if (data.lastChocolated == date) return;

			data.lastChocolated = date;
			friend.setPerModulesData(this, data);

			const text = serifs.whiteday.okaeshiFromYou(friend.name);

			this.ai.sendMessage(friend.userId, {
				text: text
			});
		});
	}
}
