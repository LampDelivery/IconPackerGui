export type MappingEntry = {
  kotlinName: string;
  aliases?: string[];
};

export const RN_TO_KOTLIN_CROSSWALK: Record<string, MappingEntry> = {
  "CallIcon": { kotlinName: "ic_call_24dp", aliases: ["call", "phone"] },
  "VideoIcon": { kotlinName: "ic_videocam_24dp", aliases: ["video", "camera"] },
  "BellIcon": { kotlinName: "ic_notifications_24dp", aliases: ["notification", "bell"] },
  "SearchIcon": { kotlinName: "ic_search_24dp", aliases: ["search", "magnify"] },
  "ChatIcon": { kotlinName: "ic_chat_24dp", aliases: ["chat", "message"] },
  "FriendsIcon": { kotlinName: "ic_people_24dp", aliases: ["friends", "users"] },
  "NitroIcon": { kotlinName: "ic_nitro_24dp", aliases: ["nitro", "boost"] },
  "SettingsIcon": { kotlinName: "ic_settings_24dp", aliases: ["settings", "gear"] },
  "InboxIcon": { kotlinName: "ic_inbox_24dp", aliases: ["inbox", "mail"] },
  "HelpIcon": { kotlinName: "ic_help_24dp", aliases: ["help", "question"] },
  "EditIcon": { kotlinName: "ic_edit_24dp", aliases: ["edit", "pencil"] },
  "TrashIcon": { kotlinName: "ic_delete_24dp", aliases: ["trash", "bin", "delete"] },
  "PlusIcon": { kotlinName: "ic_add_24dp", aliases: ["plus", "add"] },
  "CloseIcon": { kotlinName: "ic_close_24dp", aliases: ["close", "x"] },
  "HomeIcon": { kotlinName: "ic_home_24dp", aliases: ["home"] },
  "ChannelIcon": { kotlinName: "ic_channel_24dp", aliases: ["channel", "hashtag"] },
  "MicrophoneIcon": { kotlinName: "ic_mic_24dp", aliases: ["mic", "microphone"] },
  "DeafenIcon": { kotlinName: "ic_headset_24dp", aliases: ["deafen", "headset"] },
  "MuteIcon": { kotlinName: "ic_mic_off_24dp", aliases: ["mute", "mic_off"] },
  "GuildIcon": { kotlinName: "ic_guild_24dp", aliases: ["guild", "server"] },
  "FolderIcon": { kotlinName: "ic_folder_24dp", aliases: ["folder"] },
  "PinIcon": { kotlinName: "ic_pin_24dp", aliases: ["pin"] },
  "ThreadIcon": { kotlinName: "ic_thread_24dp", aliases: ["thread"] },
  "StageIcon": { kotlinName: "ic_stage_24dp", aliases: ["stage"] },
  "ForumIcon": { kotlinName: "ic_forum_24dp", aliases: ["forum"] },
  "VoiceIcon": { kotlinName: "ic_voice_24dp", aliases: ["voice"] },
  "TextIcon": { kotlinName: "ic_text_channel_24dp", aliases: ["text"] },
  "LockIcon": { kotlinName: "ic_lock_24dp", aliases: ["lock", "private"] },
  "NSFWIcon": { kotlinName: "ic_nsfw_24dp", aliases: ["nsfw"] },
  "AtIcon": { kotlinName: "ic_at_24dp", aliases: ["at", "mention"] },
  "EmojiIcon": { kotlinName: "ic_emoji_24dp", aliases: ["emoji", "smiley"] },
  "GifIcon": { kotlinName: "ic_gif_24dp", aliases: ["gif"] },
  "StickerIcon": { kotlinName: "ic_sticker_24dp", aliases: ["sticker"] },
  "AttachmentIcon": { kotlinName: "ic_attachment_24dp", aliases: ["attachment", "file"] },
  "ImageIcon": { kotlinName: "ic_image_24dp", aliases: ["image", "photo"] },
  "LinkIcon": { kotlinName: "ic_link_24dp", aliases: ["link", "url"] },
  "CopyIcon": { kotlinName: "ic_copy_24dp", aliases: ["copy"] },
  "ShareIcon": { kotlinName: "ic_share_24dp", aliases: ["share"] },
  "MoreIcon": { kotlinName: "ic_more_24dp", aliases: ["more", "dots"] },
  "ArrowLeftIcon": { kotlinName: "ic_arrow_left_24dp", aliases: ["arrow_left", "back"] },
  "ArrowRightIcon": { kotlinName: "ic_arrow_right_24dp", aliases: ["arrow_right", "forward"] },
  "ArrowDownIcon": { kotlinName: "ic_arrow_down_24dp", aliases: ["arrow_down"] },
  "ArrowUpIcon": { kotlinName: "ic_arrow_up_24dp", aliases: ["arrow_up"] },
  "ArrowLargeLeftIcon": { kotlinName: "ic_arrow_large_left_24dp", aliases: ["arrow_large_left"] },
  "ArrowLargeRightIcon": { kotlinName: "ic_arrow_large_right_24dp", aliases: ["arrow_large_right"] },
  "ArrowLargeDownIcon": { kotlinName: "ic_arrow_large_down_24dp", aliases: ["arrow_large_down"] },
  "ArrowSmallLeftIcon": { kotlinName: "ic_arrow_small_left_24dp", aliases: ["arrow_small_left"] },
  "ArrowSmallRightIcon": { kotlinName: "ic_arrow_small_right_24dp", aliases: ["arrow_small_right"] },
  "ArrowSmallDownIcon": { kotlinName: "ic_arrow_small_down_24dp", aliases: ["arrow_small_down"] },
  "ArrowSmallUpIcon": { kotlinName: "ic_arrow_small_up_24dp", aliases: ["arrow_small_up"] },
  "CheckIcon": { kotlinName: "ic_check_24dp", aliases: ["check", "done"] },
  "InfoIcon": { kotlinName: "ic_info_24dp", aliases: ["info", "information"] },
  "WarningIcon": { kotlinName: "ic_warning_24dp", aliases: ["warning", "alert"] },
  "ErrorIcon": { kotlinName: "ic_error_24dp", aliases: ["error"] },
  "RefreshIcon": { kotlinName: "ic_refresh_24dp", aliases: ["refresh", "reload"] },
  "DownloadIcon": { kotlinName: "ic_download_24dp", aliases: ["download"] },
  "UploadIcon": { kotlinName: "ic_upload_24dp", aliases: ["upload"] },
  "SendIcon": { kotlinName: "ic_send_24dp", aliases: ["send"] },
  "ReplyIcon": { kotlinName: "ic_reply_24dp", aliases: ["reply"] },
  "ReactIcon": { kotlinName: "ic_reaction_24dp", aliases: ["react", "reaction"] },
  "MentionIcon": { kotlinName: "ic_mention_24dp", aliases: ["mention"] },
  "HashtagIcon": { kotlinName: "ic_hashtag_24dp", aliases: ["hashtag"] },
  "BanIcon": { kotlinName: "ic_ban_24dp", aliases: ["ban", "block"] },
  "KickIcon": { kotlinName: "ic_kick_24dp", aliases: ["kick"] },
  "TimeoutIcon": { kotlinName: "ic_timeout_24dp", aliases: ["timeout", "timer"] },
  "ModIcon": { kotlinName: "ic_mod_24dp", aliases: ["mod", "shield"] },
  "AdminIcon": { kotlinName: "ic_admin_24dp", aliases: ["admin", "crown"] },
  "RoleIcon": { kotlinName: "ic_role_24dp", aliases: ["role"] },
  "PermissionIcon": { kotlinName: "ic_permission_24dp", aliases: ["permission"] },
  "InviteIcon": { kotlinName: "ic_invite_24dp", aliases: ["invite", "person_add"] },
  "LeaveIcon": { kotlinName: "ic_leave_24dp", aliases: ["leave", "exit"] },
  "ExpandIcon": { kotlinName: "ic_expand_24dp", aliases: ["expand"] },
  "CollapseIcon": { kotlinName: "ic_collapse_24dp", aliases: ["collapse"] },
  "MaximizeIcon": { kotlinName: "ic_maximize_24dp", aliases: ["maximize", "fullscreen"] },
  "MinimizeIcon": { kotlinName: "ic_minimize_24dp", aliases: ["minimize"] },
  "SortIcon": { kotlinName: "ic_sort_24dp", aliases: ["sort"] },
  "FilterIcon": { kotlinName: "ic_filter_24dp", aliases: ["filter"] },
  "ScreenShareIcon": { kotlinName: "ic_screen_share_24dp", aliases: ["screen_share", "screenshare"] },
  "StreamIcon": { kotlinName: "ic_stream_24dp", aliases: ["stream", "live"] },
  "ActivityIcon": { kotlinName: "ic_activity_24dp", aliases: ["activity", "game"] },
  "ActivitiesIcon": { kotlinName: "ic_activities_24dp", aliases: ["activities"] },
  "StatusIcon": { kotlinName: "ic_status_24dp", aliases: ["status"] },
  "OnlineIcon": { kotlinName: "ic_online_24dp", aliases: ["online", "green"] },
  "OfflineIcon": { kotlinName: "ic_offline_24dp", aliases: ["offline", "gray"] },
  "IdleIcon": { kotlinName: "ic_idle_24dp", aliases: ["idle", "away"] },
  "DNDIcon": { kotlinName: "ic_dnd_24dp", aliases: ["dnd", "do_not_disturb"] },
  "SpotifyIcon": { kotlinName: "ic_spotify_24dp", aliases: ["spotify"] },
  "GameIcon": { kotlinName: "ic_game_24dp", aliases: ["game", "controller"] },
  "MusicIcon": { kotlinName: "ic_music_24dp", aliases: ["music", "note"] },
  "BotIcon": { kotlinName: "ic_bot_24dp", aliases: ["bot"] },
  "WebhookIcon": { kotlinName: "ic_webhook_24dp", aliases: ["webhook"] },
  "IntegrationIcon": { kotlinName: "ic_integration_24dp", aliases: ["integration"] },
  "APIIcon": { kotlinName: "ic_api_24dp", aliases: ["api", "code"] },
  "DeveloperIcon": { kotlinName: "ic_developer_24dp", aliases: ["developer", "dev"] },
  "DebugIcon": { kotlinName: "ic_debug_24dp", aliases: ["debug", "bug"] },
  "LogsIcon": { kotlinName: "ic_logs_24dp", aliases: ["logs", "console"] },
  "ThemeIcon": { kotlinName: "ic_theme_24dp", aliases: ["theme", "palette"] },
  "AppearanceIcon": { kotlinName: "ic_appearance_24dp", aliases: ["appearance"] },
  "LanguageIcon": { kotlinName: "ic_language_24dp", aliases: ["language", "translate"] },
  "NotificationSettingsIcon": { kotlinName: "ic_notification_settings_24dp", aliases: ["notification_settings"] },
  "PrivacyIcon": { kotlinName: "ic_privacy_24dp", aliases: ["privacy", "eye"] },
  "SecurityIcon": { kotlinName: "ic_security_24dp", aliases: ["security", "shield"] },
  "AccountIcon": { kotlinName: "ic_account_24dp", aliases: ["account", "person"] },
  "ProfileIcon": { kotlinName: "ic_profile_24dp", aliases: ["profile", "user"] },
  "AvatarIcon": { kotlinName: "ic_avatar_24dp", aliases: ["avatar"] },
  "CameraIcon": { kotlinName: "ic_camera_24dp", aliases: ["camera", "photo"] },
  "GalleryIcon": { kotlinName: "ic_gallery_24dp", aliases: ["gallery", "photos"] },
  "DocumentIcon": { kotlinName: "ic_document_24dp", aliases: ["document", "doc"] },
  "AudioIcon": { kotlinName: "ic_audio_24dp", aliases: ["audio", "sound"] },
  "VolumeIcon": { kotlinName: "ic_volume_24dp", aliases: ["volume", "speaker"] },
  "VolumeMuteIcon": { kotlinName: "ic_volume_mute_24dp", aliases: ["volume_mute", "speaker_off"] },
  "PlayIcon": { kotlinName: "ic_play_24dp", aliases: ["play"] },
  "PauseIcon": { kotlinName: "ic_pause_24dp", aliases: ["pause"] },
  "StopIcon": { kotlinName: "ic_stop_24dp", aliases: ["stop"] },
  "SkipIcon": { kotlinName: "ic_skip_24dp", aliases: ["skip", "next"] },
  "PreviousIcon": { kotlinName: "ic_previous_24dp", aliases: ["previous", "back"] },
  "ShuffleIcon": { kotlinName: "ic_shuffle_24dp", aliases: ["shuffle", "random"] },
  "RepeatIcon": { kotlinName: "ic_repeat_24dp", aliases: ["repeat", "loop"] },
  "QueueIcon": { kotlinName: "ic_queue_24dp", aliases: ["queue", "playlist"] },
  "StarIcon": { kotlinName: "ic_star_24dp", aliases: ["star", "favorite"] },
  "HeartIcon": { kotlinName: "ic_heart_24dp", aliases: ["heart", "love"] },
  "BookmarkIcon": { kotlinName: "ic_bookmark_24dp", aliases: ["bookmark", "save"] },
  "HistoryIcon": { kotlinName: "ic_history_24dp", aliases: ["history", "clock"] },
  "CalendarIcon": { kotlinName: "ic_calendar_24dp", aliases: ["calendar", "date"] },
  "EventIcon": { kotlinName: "ic_event_24dp", aliases: ["event", "schedule"] },
  "ReminderIcon": { kotlinName: "ic_reminder_24dp", aliases: ["reminder", "alarm"] },
  "ClockIcon": { kotlinName: "ic_clock_24dp", aliases: ["clock", "time"] },
  "LocationIcon": { kotlinName: "ic_location_24dp", aliases: ["location", "pin"] },
  "MapIcon": { kotlinName: "ic_map_24dp", aliases: ["map"] },
  "GlobeIcon": { kotlinName: "ic_globe_24dp", aliases: ["globe", "world", "earth"] },
  "WifiIcon": { kotlinName: "ic_wifi_24dp", aliases: ["wifi", "connection"] },
  "BluetoothIcon": { kotlinName: "ic_bluetooth_24dp", aliases: ["bluetooth"] },
  "CastIcon": { kotlinName: "ic_cast_24dp", aliases: ["cast", "chromecast"] },
  "AirplayIcon": { kotlinName: "ic_airplay_24dp", aliases: ["airplay"] },
  "QRCodeIcon": { kotlinName: "ic_qr_code_24dp", aliases: ["qr", "qr_code"] },
  "ScanIcon": { kotlinName: "ic_scan_24dp", aliases: ["scan"] },
  "PrintIcon": { kotlinName: "ic_print_24dp", aliases: ["print"] },
  "SaveIcon": { kotlinName: "ic_save_24dp", aliases: ["save"] },
  "UndoIcon": { kotlinName: "ic_undo_24dp", aliases: ["undo"] },
  "RedoIcon": { kotlinName: "ic_redo_24dp", aliases: ["redo"] },
  "CutIcon": { kotlinName: "ic_cut_24dp", aliases: ["cut", "scissors"] },
  "PasteIcon": { kotlinName: "ic_paste_24dp", aliases: ["paste"] },
  "SelectAllIcon": { kotlinName: "ic_select_all_24dp", aliases: ["select_all"] },
  "BoldIcon": { kotlinName: "ic_bold_24dp", aliases: ["bold"] },
  "ItalicIcon": { kotlinName: "ic_italic_24dp", aliases: ["italic"] },
  "UnderlineIcon": { kotlinName: "ic_underline_24dp", aliases: ["underline"] },
  "StrikethroughIcon": { kotlinName: "ic_strikethrough_24dp", aliases: ["strikethrough"] },
  "CodeIcon": { kotlinName: "ic_code_24dp", aliases: ["code"] },
  "QuoteIcon": { kotlinName: "ic_quote_24dp", aliases: ["quote", "blockquote"] },
  "ListIcon": { kotlinName: "ic_list_24dp", aliases: ["list"] },
  "NumberedListIcon": { kotlinName: "ic_numbered_list_24dp", aliases: ["numbered_list", "ordered_list"] },
  "IndentIcon": { kotlinName: "ic_indent_24dp", aliases: ["indent"] },
  "OutdentIcon": { kotlinName: "ic_outdent_24dp", aliases: ["outdent", "dedent"] },
  "AlignLeftIcon": { kotlinName: "ic_align_left_24dp", aliases: ["align_left"] },
  "AlignCenterIcon": { kotlinName: "ic_align_center_24dp", aliases: ["align_center"] },
  "AlignRightIcon": { kotlinName: "ic_align_right_24dp", aliases: ["align_right"] },
  "FontIcon": { kotlinName: "ic_font_24dp", aliases: ["font", "text"] },
  "FontSizeIcon": { kotlinName: "ic_font_size_24dp", aliases: ["font_size"] },
  "ColorIcon": { kotlinName: "ic_color_24dp", aliases: ["color", "fill"] },
  "HighlightIcon": { kotlinName: "ic_highlight_24dp", aliases: ["highlight"] },
  "SpoilerIcon": { kotlinName: "ic_spoiler_24dp", aliases: ["spoiler"] },
  "MaskIcon": { kotlinName: "ic_mask_24dp", aliases: ["mask", "hide"] },
  "VisibleIcon": { kotlinName: "ic_visible_24dp", aliases: ["visible", "show", "eye"] },
  "HiddenIcon": { kotlinName: "ic_hidden_24dp", aliases: ["hidden", "invisible", "eye_off"] },
  "NotificationsIcon": { kotlinName: "ic_notifications_24dp", aliases: ["notifications"] },
  "AccessibilityIcon": { kotlinName: "ic_accessibility_24dp", aliases: ["accessibility"] },
  "AchievementsIcon": { kotlinName: "ic_achievements_24dp", aliases: ["achievements", "trophy"] },
  "AnalyticsIcon": { kotlinName: "ic_analytics_24dp", aliases: ["analytics", "chart"] },
  "AnnouncementsIcon": { kotlinName: "ic_announcements_24dp", aliases: ["announcements", "megaphone"] },
  "AnnouncementsLockIcon": { kotlinName: "ic_announcements_lock_24dp", aliases: ["announcements_lock"] },
  "AnnouncementsWarningIcon": { kotlinName: "ic_announcements_warning_24dp", aliases: ["announcements_warning"] },
  "AppsIcon": { kotlinName: "ic_apps_24dp", aliases: ["apps", "grid"] },
  "ArrowAngleLeftUpIcon": { kotlinName: "ic_arrow_angle_left_up_24dp", aliases: ["arrow_angle_left_up"] },
  "ArrowAngleRightUpIcon": { kotlinName: "ic_arrow_angle_right_up_24dp", aliases: ["arrow_angle_right_up"] },
  "ArrowsUpDownIcon": { kotlinName: "ic_arrows_up_down_24dp", aliases: ["arrows_up_down", "sort"] },
};

export function suggestKotlinName(rnIconName: string): string {
  const cleanName = rnIconName.replace(/Icon\.png$/i, "").replace(/\.png$/i, "");
  
  const exactKey = `${cleanName}Icon`;
  if (RN_TO_KOTLIN_CROSSWALK[exactKey]) {
    return RN_TO_KOTLIN_CROSSWALK[exactKey].kotlinName;
  }
  
  if (RN_TO_KOTLIN_CROSSWALK[cleanName]) {
    return RN_TO_KOTLIN_CROSSWALK[cleanName].kotlinName;
  }
  
  const lowerClean = cleanName.toLowerCase();
  for (const [key, entry] of Object.entries(RN_TO_KOTLIN_CROSSWALK)) {
    const keyLower = key.toLowerCase().replace("icon", "");
    if (keyLower === lowerClean) {
      return entry.kotlinName;
    }
    if (entry.aliases?.some((a) => lowerClean === a || a === lowerClean)) {
      return entry.kotlinName;
    }
  }
  
  for (const [key, entry] of Object.entries(RN_TO_KOTLIN_CROSSWALK)) {
    if (entry.aliases?.some((a) => lowerClean.includes(a) || a.includes(lowerClean))) {
      return entry.kotlinName;
    }
  }
  
  let snake = cleanName
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    .toLowerCase();
  snake = snake.replace(/[^a-z0-9_]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return `ic_${snake}_24dp`;
}
