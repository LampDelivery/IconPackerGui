// Initial crosswalk data
// Maps Themes+ Icon Names (often based on RN or file names) -> Aliucord/Android Resource Names

export type MappingEntry = {
  android: string;
  aliases?: string[];
};

export const INITIAL_CROSSWALK: Record<string, MappingEntry> = {
  "BellIcon": { android: "ic_notifications_white_24dp", aliases: ["notification", "bell"] },
  "ChatIcon": { android: "ic_chat_white_24dp", aliases: ["chat", "message"] },
  "FriendsIcon": { android: "ic_people_white_24dp", aliases: ["friends", "users"] },
  "NitroIcon": { android: "ic_nitro_white_24dp", aliases: ["nitro", "boost"] },
  "SettingsIcon": { android: "ic_settings_white_24dp", aliases: ["settings", "gear"] },
  "SearchIcon": { android: "ic_search_white_24dp", aliases: ["search", "magnify"] },
  "InboxIcon": { android: "ic_inbox_white_24dp", aliases: ["inbox", "mail"] },
  "HelpIcon": { android: "ic_help_white_24dp", aliases: ["help", "question"] },
  "EditIcon": { android: "ic_edit_white_24dp", aliases: ["edit", "pencil"] },
  "TrashIcon": { android: "ic_delete_white_24dp", aliases: ["trash", "bin", "delete"] },
  "PlusIcon": { android: "ic_add_white_24dp", aliases: ["plus", "add"] },
  "CloseIcon": { android: "ic_close_white_24dp", aliases: ["close", "x"] },
  "HomeIcon": { android: "ic_home_white_24dp", aliases: ["home"] },
  "ChannelIcon": { android: "ic_channel_white_24dp", aliases: ["channel", "hashtag"] },
  // Add more based on common Discord icon names
};

export function suggestMapping(iconName: string): string | null {
  // Exact match
  if (INITIAL_CROSSWALK[iconName]) return INITIAL_CROSSWALK[iconName].android;
  
  // Normalize
  const lower = iconName.toLowerCase().replace("icon", "").replace(".png", "");
  
  // Alias search
  for (const [key, val] of Object.entries(INITIAL_CROSSWALK)) {
    if (key.toLowerCase().includes(lower)) return val.android;
    if (val.aliases?.some(a => lower.includes(a))) return val.android;
  }
  
  return null;
}
