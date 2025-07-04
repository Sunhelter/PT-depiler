import type { IAdvancedSearchRequestConfig, TSelectSearchCategoryValue, ISiteMetadata } from "../types.ts";
import Gazelle, { SchemaMetadata } from "../schemas/Gazelle.ts";
import { parseSizeString } from "../utils";

export const siteMetadata: ISiteMetadata = {

    ...SchemaMetadata,

    version: 1,
    id: "broadcasthenet",
    name: "BroadcastTheNet",
    aka: ["BTN"],
    description: "BroadcastTheNet is a private tracker for TV shows.",
    tags: ["电视剧"],
    timezoneOffset: "+0800",
    collaborator: ["Sunhelter"],

    type: "private",
    schema: "Gazelle",

    urls: ["https://broadcasthe.net/"],
    favicon: "https://broadcasthe.net/favicon.ico",

    category: [
        {
            name: "Tags",
            key: "searchtags",
            options: [
                { name: "Remux", value: "Remux" },
                { name: "Subtitles", value: "Subtitles" },
                { name: "Uncut", value: "Uncut" },
                { name: "Dolby Vision", value: "Dolby Vision" },
                { name: "HDR10 Compatible", value: "HDR10 Compatible" },
                { name: "Hybrid Log Gamma", value: "Hybrid Log Gamma" },
                { name: "Modified Aspect Ratio", value: "Modified Aspect Ratio" },
                { name: "Dolby Atmos", value: "Dolby Atmos" },
                { name: "5.1 Channels", value: "5.1 Channels" },
                { name: "7.1 Channels", value: "7.1 Channels" },
                { name: "Surround Sound", value: "Surround Sound" },
                { name: "Commentary", value: "Commentary" },
                { name: "Dual Language", value: "Dual Language" },
                { name: "Action", value: "Action" },
                { name: "Adventure", value: "Adventure" },
                { name: "Animation", value: "Animation" },
                { name: "Anime", value: "Anime" },
                { name: "Awards Show", value: "Awards Show" },
                { name: "Children", value: "Children" },
                { name: "Comedy", value: "Comedy" },
                { name: "Crime", value: "Crime" },
                { name: "Documentary", value: "Documentary" },
                { name: "Drama", value: "Drama" },
                { name: "Family", value: "Family" },
                { name: "Fantasy", value: "Fantasy" },
                { name: "Food", value: "Food" },
                { name: "Game Show", value: "Game Show" },
                { name: "History", value: "History" },
                { name: "Home and Garden", value: "Home and Garden" },
                { name: "Horror", value: "Horror" },
                { name: "Indie", value: "Indie" },
                { name: "Martial Arts", value: "Martial Arts" },
                { name: "Mini-Series", value: "Mini-Series" },
                { name: "Musical", value: "Musical" },
                { name: "Mystery", value: "Mystery" },
                { name: "News", value: "News" },
                { name: "Podcast", value: "Podcast" },
                { name: "Reality", value: "Reality" },
                { name: "Romance", value: "Romance" },
                { name: "Science Fiction", value: "Science Fiction" },
                { name: "Soap", value: "Soap" },
                { name: "Sport", value: "Sport" },
                { name: "Suspense", value: "Suspense" },
                { name: "Talk Show", value: "Talk Show" },
                { name: "Thriller", value: "Thriller" },
                { name: "Travel", value: "Travel" },
                { name: "War", value: "War" },
                { name: "Western", value: "Western" },
            ],
            cross: { mode: "comma" },
        },
        {
            name: "Order By",
            key: "order_by",
            options: [
                { name: "Name", value: "name" },
                { name: "Year", value: "year" },
                { name: "Size", value: "size" },
                { name: "Snatched", value: "snatched" },
                { name: "Seeders", value: "seeders" },
                { name: "Leechers", value: "leechers" },
            ],
        },
        {
            name: "Order Direction",
            key: "order_dir",
            options: [
                { name: "Ascending", value: "asc" },
            ],
        },
        {
            name: "Foreign Content",
            key: "foreign",
            options: [
                { name: "English Only", value: 0 },
                { name: "Foreign Only", value: 1 },
            ],
        },
        {
            name: "Episode",
            key: "filter_cat%5B1%5D",
            options: [
                { name: "Checked", value: 1 },
            ],
        },
        {
            name: "Season",
            key: "filter_cat%5B2%5D",
            options: [
                { name: "Checked", value: 1 },
            ],
        }
    ],

    search: {
        ...SchemaMetadata.search!,
    },

    userInfo: {
        ...SchemaMetadata.userInfo!,
        selectors: {
            uploaded: { selector: "ul.nobullet > li:contains('Upload:')", },
            downloaded: { selector: "ul.nobullet > li:contains('Downloaded:')" },
            levelName: { selector: "ul.nobullet > li:contains('User Class:')" },
            bonus: {
                selector: "ul.nobullet > li:contains('Bonus Points:') > a",
                filters: [
                    (query: string) => {
                        query = query.replace(/,/g, "");
                        return query.length > 0 ? parseFloat(query) : 0;
                    },
                ],
            },
            ratio: undefined,
            joinTime: { selector: "ul.nobullet > li:contains('Joined:') > span" },
            seeding: {
                selector: "ul.nobullet > li:contains('Seeding:')",
                filters: [
                    (query: string) => {
                        const queryMatch = query.replace(/,/g, "").match(/Seeding.+?([\d.]+)/);
                        return queryMatch && queryMatch.length >= 2 ? parseFloat(queryMatch[1]) : 0;
                    },
                ],
            },
            seedingSize: {
                selector: "ul.nobullet > li:contains('Seeding Size:')",
                filters: [
                    (query: string) => {
                        const queryMatch = query.replace(/,/g, "").match(/Seeding Size:.+?([\d.]+ ?[ZEPTGMK]?i?B)/);
                        return queryMatch && queryMatch.length >= 2 ? parseSizeString(queryMatch[1]) : 0;
                    },
                ],
            },
        },
    },

    levelRequirements: [
        {
            id: 1,
            name: "Member",
            totalTraffic: "100GB",
            bonus: 100000,
            snatches: 100,
            interval: "P2W",
            privilege: "Can access the XXX forum.",
        },
        {
            id: 2,
            name: "Power User",
            totalTraffic: "250GB",
            bonus: 250000,
            snatches: 250,
            interval: "P4W",
            privilege: "Has access to the Power User forum, Official and Unofficial Invites forums, Top 10 filters, and can access notifications.",
        },
        {
            id: 3,
            name: "Extreme User",
            totalTraffic: "500GB",
            bonus: 500000,
            snatches: 500,
            interval: "P2M3W",
            privilege: "Has access to the Extreme User forum.",
        },
        {
            id: 4,
            name: "Elite",
            totalTraffic: "1TB",
            bonus: 850000,
            snatches: 1000,
            interval: "P5M2W",
            privilege: "Has access to the Elite forum and can set own Custom Title, and the ability to send invites purchased from the Lumens Store.",
        },
        {
            id: 5,
            name: "Guru",
            totalTraffic: "2.5TB",
            bonus: 1500000,
            snatches: 1500,
            interval: "P8M1W",
            privilege: "Has access to the Guru forum.",
        },
        {
            id: 6,
            name: "Master",
            totalTraffic: "7.5TB",
            bonus: 3000000,
            snatches: 3000,
            interval: "P11M4W",
            privilege: "Has access to the Master forum.",
        },
        {
            id: 7,
            name: "Overlord",
            totalTraffic: "100TB",
            bonus: 250000000,
            snatches: 35000,
            interval: "P2Y11M",
            privilege: "Has access to the Overlord forum, Custom Title, Unlimited Invites, and more to come!",
        },
    ],
};
