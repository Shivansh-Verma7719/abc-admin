import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/types/database.types";
import { uploadImage as uploadImageUtil } from "@/utils/images/upload";

type Event = Partial<Tables<"events">>;

export async function uploadImage(file: File): Promise<string | null> {
  try {
    const result = await uploadImageUtil(file, {
      bucket: "event_images",
      folder: "events",
      generateUniqueFileName: true,
      compression: {
        maxSizeMB: 1,
        maxWidthOrHeight: 1200,
        quality: 0.8,
        fileType: "image/webp",
      },
    });

    if (result.success && result.url) {
      // Log compression info if available
      if (result.compressionInfo) {
        console.log("Image compression completed:", result.compressionInfo);
      }
      return result.url;
    } else {
      console.error("Error uploading image:", result.error);
      return null;
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}

export async function createEvent(
  eventData: Event
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();

  const { error } = await supabase.from("events").insert([eventData]);

  if (error) {
    console.error("Error creating event:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
