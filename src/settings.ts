import { type App, PluginSettingTab, Setting } from "obsidian";
import type Hefaisto from "./main";

export interface HefaistoSettings {
	greeting: string;
}

export const DEFAULT_SETTINGS: HefaistoSettings = {
	greeting: "Hello, world!",
};

export class HefaistoSettingTab extends PluginSettingTab {
	plugin: Hefaisto;

	constructor(app: App, plugin: Hefaisto) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName("Greeting")
			.setDesc("Text shown by the greet command.")
			.addText((text) =>
				text
					.setValue(this.plugin.settings.greeting)
					.onChange(async (value) => {
						this.plugin.settings.greeting = value;
						await this.plugin.saveSettings();
					}),
			);
	}
}
