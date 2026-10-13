import { Notice, Plugin } from "obsidian";
import {
	DEFAULT_SETTINGS,
	type HefaistoSettings,
	HefaistoSettingTab,
} from "./settings";

export default class Hefaisto extends Plugin {
	settings!: HefaistoSettings;

	async onload() {
		await this.loadSettings();

		this.addCommand({
			id: "greet",
			name: "Greet",
			callback: () => {
				new Notice(this.settings.greeting);
			},
		});

		this.addSettingTab(new HefaistoSettingTab(this.app, this));
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<HefaistoSettings>,
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
