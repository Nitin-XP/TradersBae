import { calendar, charts, heatmap, news, screener } from "../../assets/images";

export const widgets = [
    {
        id: "#slide1",
        heading: "Charts",
        para: "Interactive Charts for In-Depth Market Analysis",
        btnText: "Let's Analyze",
        link: "/widgets/charts",
        src: charts,
    },
    {
        id: "#slide2",
        heading: "Heatmaps",
        para: "Track Sector Strength and Weakness",
        btnText: "Market Summary",
        link: "/widgets/heatmaps",
        src: heatmap,
    },
    {
        id: "#slide3",
        heading: "Screeners",
        para: "Discover Market Movers and Hidden Gems Instantly",
        btnText: "Find Top Stocks",
        link: "/widgets/screeners",
        src: screener,
    },
    {
        id: "#slide4",
        heading: "Latest Market News",
        para: "Catch up on the hottest topics and market movements",
        btnText: "Top News",
        link: "/widgets/news",
        src: news,
    },
    {
        id: "#slide5",
        heading: "Calendar",
        para: "Keep an eye on key upcoming economic events, announcements, and news.",
        btnText: "Calendar",
        link: "/widgets/calendar",
        src: calendar,
    },
]