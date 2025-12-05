import JSZip from "jszip";
import ImageTracer from "imagetracerjs";

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
  "StarIcon": { kotlinName: "ic_star_24dp", aliases: ["star", "favorite"] },
  "HeartIcon": { kotlinName: "ic_heart_24dp", aliases: ["heart", "love"] },
  "BookmarkIcon": { kotlinName: "ic_bookmark_24dp", aliases: ["bookmark", "save"] },
  "PlayIcon": { kotlinName: "ic_play_24dp", aliases: ["play"] },
  "PauseIcon": { kotlinName: "ic_pause_24dp", aliases: ["pause"] },
  "StopIcon": { kotlinName: "ic_stop_24dp", aliases: ["stop"] },
  "VolumeIcon": { kotlinName: "ic_volume_24dp", aliases: ["volume", "speaker"] },
  "VolumeMuteIcon": { kotlinName: "ic_volume_mute_24dp", aliases: ["volume_mute", "speaker_off"] },
  "CameraIcon": { kotlinName: "ic_camera_24dp", aliases: ["camera", "photo"] },
  "ProfileIcon": { kotlinName: "ic_profile_24dp", aliases: ["profile", "user"] },
  "AccountIcon": { kotlinName: "ic_account_24dp", aliases: ["account", "person"] },
  "ScreenShareIcon": { kotlinName: "ic_screen_share_24dp", aliases: ["screen_share", "screenshare"] },
  "StreamIcon": { kotlinName: "ic_stream_24dp", aliases: ["stream", "live"] },
  "ActivityIcon": { kotlinName: "ic_activity_24dp", aliases: ["activity", "game"] },
  "BotIcon": { kotlinName: "ic_bot_24dp", aliases: ["bot"] },
  "CodeIcon": { kotlinName: "ic_code_24dp", aliases: ["code"] },
  "ThemeIcon": { kotlinName: "ic_theme_24dp", aliases: ["theme", "palette"] },
  "LanguageIcon": { kotlinName: "ic_language_24dp", aliases: ["language", "translate"] },
  "PrivacyIcon": { kotlinName: "ic_privacy_24dp", aliases: ["privacy", "eye"] },
  "SecurityIcon": { kotlinName: "ic_security_24dp", aliases: ["security", "shield"] },
  "GlobeIcon": { kotlinName: "ic_globe_24dp", aliases: ["globe", "world", "earth"] },
  "CalendarIcon": { kotlinName: "ic_calendar_24dp", aliases: ["calendar", "date"] },
  "ClockIcon": { kotlinName: "ic_clock_24dp", aliases: ["clock", "time"] },
  "LocationIcon": { kotlinName: "ic_location_24dp", aliases: ["location", "pin"] },
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
  
  for (const [, entry] of Object.entries(RN_TO_KOTLIN_CROSSWALK)) {
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

export interface DiscoveredIcon {
  originalName: string;
  originalPath: string;
  suggestedKotlinName: string;
  kotlinName: string;
  pngDataUrl: string;
  svgData?: string;
  xmlData?: string;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
}

export async function extractIconsFromZip(file: File): Promise<DiscoveredIcon[]> {
  const zip = await JSZip.loadAsync(file);
  const icons: DiscoveredIcon[] = [];

  for (const [path, zipEntry] of Object.entries(zip.files)) {
    if (zipEntry.dir) continue;
    if (!path.toLowerCase().endsWith(".png")) continue;
    
    const basename = path.split("/").pop() || "";
    if (basename.startsWith(".") || basename.startsWith("__")) continue;

    try {
      const arrayBuffer = await zipEntry.async("arraybuffer");
      if (arrayBuffer.byteLength === 0) continue;

      const base64 = arrayBufferToBase64(arrayBuffer);
      const pngDataUrl = `data:image/png;base64,${base64}`;

      const suggestedName = suggestKotlinName(basename);

      icons.push({
        originalName: basename,
        originalPath: path,
        suggestedKotlinName: suggestedName,
        kotlinName: suggestedName,
        pngDataUrl,
        status: "pending",
      });
    } catch (e) {
      console.error(`Failed to process ${path}:`, e);
    }
  }

  return icons;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function pngToSvg(pngDataUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    ImageTracer.imageToSVG(
      pngDataUrl,
      (svgString: string) => {
        if (svgString) {
          resolve(svgString);
        } else {
          reject(new Error("ImageTracer returned empty SVG"));
        }
      },
      {
        ltres: 1,
        qtres: 1,
        pathomit: 8,
        colorsampling: 2,
        numberofcolors: 16,
        strokewidth: 0,
        viewbox: true,
      }
    );
  });
}

export function svgToAndroidVector(svgContent: string, viewportSize = 24): string {
  const pathRegex = /<path[^>]*d="([^"]*)"[^>]*(?:fill="([^"]*)")?[^>]*>/gi;
  const paths: Array<{ d: string; fill: string }> = [];
  
  let match;
  while ((match = pathRegex.exec(svgContent)) !== null) {
    paths.push({
      d: match[1],
      fill: match[2] || "#FFFFFFFF",
    });
  }
  
  if (paths.length === 0) {
    const altPathRegex = /<path[^>]*(?:fill="([^"]*)")?[^>]*d="([^"]*)"[^>]*>/gi;
    while ((match = altPathRegex.exec(svgContent)) !== null) {
      paths.push({
        d: match[2],
        fill: match[1] || "#FFFFFFFF",
      });
    }
  }
  
  let pathElements = "";
  paths.forEach((p) => {
    const fillColor = p.fill === "none" ? "#00000000" : p.fill.startsWith("#") ? p.fill : `#${p.fill}`;
    pathElements += `
    <path
        android:fillColor="${fillColor}"
        android:pathData="${p.d}" />`;
  });

  return `<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="${viewportSize}dp"
    android:height="${viewportSize}dp"
    android:viewportWidth="${viewportSize}"
    android:viewportHeight="${viewportSize}">
${pathElements}
</vector>`;
}

export async function convertIcon(icon: DiscoveredIcon): Promise<DiscoveredIcon> {
  try {
    const svgData = await pngToSvg(icon.pngDataUrl);
    const xmlData = svgToAndroidVector(svgData);
    
    return {
      ...icon,
      svgData,
      xmlData,
      status: "done",
    };
  } catch (error: unknown) {
    return {
      ...icon,
      status: "error",
      error: error instanceof Error ? error.message : "Conversion failed",
    };
  }
}

export async function createDownloadZip(
  icons: DiscoveredIcon[],
  packName: string,
  includeSvg: boolean,
  includeXml: boolean
): Promise<Blob> {
  const zip = new JSZip();
  
  const mappings: Record<string, { original: string; svg?: string; xml?: string }> = {};

  for (const icon of icons) {
    if (icon.status !== "done" || !icon.svgData) continue;

    const safeName = icon.kotlinName.toLowerCase().replace(/[^a-z0-9_]/g, "_");
    
    mappings[icon.originalName] = {
      original: icon.originalPath,
      svg: includeSvg ? `svg/${safeName}.svg` : undefined,
      xml: includeXml ? `drawable/${safeName}.xml` : undefined,
    };

    if (includeSvg) {
      zip.file(`svg/${safeName}.svg`, icon.svgData);
    }

    if (includeXml && icon.xmlData) {
      zip.file(`drawable/${safeName}.xml`, icon.xmlData);
    }
  }

  const manifest = JSON.stringify(
    {
      name: packName,
      version: "1.0.0",
      generatedAt: new Date().toISOString(),
      iconCount: Object.keys(mappings).length,
      mappings,
    },
    null,
    2
  );
  zip.file("manifest.json", manifest);

  return await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
}
