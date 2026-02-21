import { NextResponse } from "next/server";
import * as GooglePhotosAlbum from "google-photos-album-image-url-fetch";

export const dynamic = "force-dynamic";

interface CachedPhotos {
  photos: { url: string; thumbnail: string; width: number; height: number }[];
  fetchedAt: number;
}

const CACHE_TTL = 60 * 60 * 1000; // 1 hour
let cache: CachedPhotos | null = null;

export async function GET() {
  const albumUrl = process.env.GOOGLE_PHOTOS_ALBUM_URL;

  if (!albumUrl) {
    return NextResponse.json(
      { photos: [], error: "GOOGLE_PHOTOS_ALBUM_URL not configured" },
      { status: 500 }
    );
  }

  // Return cached result if still fresh
  if (cache && cache.photos.length > 0 && Date.now() - cache.fetchedAt < CACHE_TTL) {
    return NextResponse.json({ photos: cache.photos });
  }

  try {
    const images = await GooglePhotosAlbum.fetchImageUrls(albumUrl);

    if (!images || images.length === 0) {
      return NextResponse.json({ photos: [] });
    }

    const photos = images.map((img) => ({
      url: `${img.url}=w1600`,
      thumbnail: `${img.url}=w400`,
      width: img.width,
      height: img.height,
    }));

    cache = { photos, fetchedAt: Date.now() };

    return NextResponse.json({ photos });
  } catch (error) {
    console.error("Failed to fetch Google Photos album:", error);
    return NextResponse.json(
      { photos: [], error: "Failed to fetch photos" },
      { status: 500 }
    );
  }
}
